#!/bin/bash
# Cut the How it's made clips (src/components/Process.tsx): one seamless loop
# and one poster for each of the ten steps, from the 8-second Flow (Veo) clips.
#
# Inputs:  film-src/process/NN-id.mp4  (1280x720, 8 s, as downloaded from Flow,
#          renamed to the step: 01-formed.mp4 … 10-packed.mp4)
# Outputs: public/video/process/NN-id.mp4    the loop: H.264, no sound, 1280x720
#          public/video/process/NN-id-m.mp4  the same at 960x540, for small frames
#          public/images/process/NN-id.webp  the loop's first frame (the poster)
#          public/images/og-process.jpg     the page's share image (1200x630)
#
# How a loop is made: from start A, the clip runs for L seconds, and over its
# last X seconds it dissolves into the clip's first X seconds after A, so the
# end leads straight back into the beginning. The file starts at A+X, a clean
# frame, which is also the poster.
#
#   A+X ─────── body ───────▶ A+L ── dissolve (A+L…A+L+X → A…A+X) ──▶ wraps to A+X
#
# So A+L+X must be at most the clip's length (8 s). The table below gives each
# clip's A, L and X: chosen by looking at the frames, to leave out moments that
# don't look right (a fire in the refinery clip's first seconds; a label and a
# stream with no jug in the beaker clip's last two seconds).
#
# Flow's visible watermark (the sparkle and "Veo", bottom right) stays in every
# frame: nothing is cropped, and in the dissolve it is the same in both frames.
# The share image is cut from the top of the frame, so the mark stays whole.
#
# Usage: bash scripts/film/process.sh          (all ten)
#        bash scripts/film/process.sh 05-shipped  (one)
# The page picks the 960 copy when the frame is under 1150 device pixels wide
# (phones, and desktops at 1x), the 1280 one otherwise (src/motion/process.ts).
# For the local preview tests (Chromium has no H.264), VP9_DIR=<folder> also
# writes a VP9 copy of each loop there.
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/film-src/process"
VID="$ROOT/public/video/process"
IMG="$ROOT/public/images/process"
mkdir -p "$VID" "$IMG"

#      clip          A     L    X
CLIPS=(
  "01-formed     0.9   6.0  1.0"
  "02-trapped    0.9   6.0  1.0"
  "03-drilled    0.9   6.0  1.0"
  "04-lifted     0.3   6.6  1.0"
  "05-shipped    0.9   6.0  1.0"
  "06-distilled  2.3   4.8  0.8"
  "07-vacuum     0.9   6.0  1.0"
  "08-refined    0.3   4.8  0.8"
  "09-blended    0.9   6.0  1.0"
  "10-packed     0.9   6.0  1.0"
)
OG="09-blended" # the share image: this clip's poster frame

for row in "${CLIPS[@]}"; do
  read -r id A L X <<<"$row"
  [ -n "$1" ] && [ "$1" != "$id" ] && continue
  in="$SRC/$id.mp4"
  [ -f "$in" ] || { echo "missing $in" >&2; exit 1; }
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
  python3 -c "import sys; sys.exit(0 if $A+$L+$X <= $dur + 0.001 else 1)" ||
    { echo "$id: A+L+X ($A+$L+$X) is longer than the clip ($dur s)" >&2; exit 1; }
  B=$(python3 -c "print(round($A+$X,3))")     # where the file starts
  E=$(python3 -c "print(round($A+$L,3))")     # where the dissolve starts
  # body: B…E; dissolve: E…E+X fading into A…A+X (T is each frame's time in s)
  filter="[0:v]split=3[a][b][c];"
  filter+="[a]trim=start=$B:end=$E,setpts=PTS-STARTPTS[body];"
  filter+="[b]trim=start=$E:duration=$X,setpts=PTS-STARTPTS[out];"
  filter+="[c]trim=start=$A:duration=$X,setpts=PTS-STARTPTS[in];"
  filter+="[in][out]blend=all_expr='A*(T/$X)+B*(1-T/$X)':shortest=1[mix];"
  filter+="[body][mix]concat=n=2:v=1:a=0,format=yuv420p[v]"
  ffmpeg -v error -y -i "$in" -filter_complex "$filter;[v]split=2[v1][v2];[v2]scale=960:540:flags=lanczos[vm]" \
    -map "[v1]" -an -c:v libx264 -preset slow -tune film -crf 28 -profile:v high -pix_fmt yuv420p -g 48 -movflags +faststart "$VID/$id.mp4" \
    -map "[vm]" -an -c:v libx264 -preset slow -tune film -crf 28 -profile:v high -pix_fmt yuv420p -g 48 -movflags +faststart "$VID/$id-m.mp4"
  ffmpeg -v error -y -ss "$B" -i "$in" -frames:v 1 -c:v libwebp -quality 74 -compression_level 6 "$IMG/$id.webp"
  if [ -n "$VP9_DIR" ]; then
    mkdir -p "$VP9_DIR"
    for f in "$id" "$id-m"; do
      ffmpeg -v error -y -i "$VID/$f.mp4" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -deadline good -cpu-used 4 -an -f mp4 "$VP9_DIR/$f.mp4"
    done
  fi
  len=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VID/$id.mp4")
  echo "$id  loop ${len%???} s  from ${B} s  $(du -k "$VID/$id.mp4" | cut -f1) KB, small $(du -k "$VID/$id-m.mp4" | cut -f1) KB, poster $(du -k "$IMG/$id.webp" | cut -f1) KB"
  if [ "$id" = "$OG" ]; then
    # 1280x720 → 1280x672 (the top 48 px off, so the watermark stays whole) → 1200x630
    ffmpeg -v error -y -ss "$B" -i "$in" -frames:v 1 -vf "crop=1280:672:0:48,scale=1200:630:flags=lanczos" -q:v 3 "$ROOT/public/images/og-process.jpg"
    echo "og-process.jpg  $(du -k "$ROOT/public/images/og-process.jpg" | cut -f1) KB"
  fi
done
