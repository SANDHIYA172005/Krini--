#!/usr/bin/env bash
# Cuts Home's hero film (a Google Flow MP4, 16:9) into what the scroll plays
# (src/content/media.ts heroSeq, src/motion/scrollhero.ts):
#   public/images/hero-seq/sNN.webp     : sheets of PER frames, 1280 × 720 each, stacked top to bottom
#   public/images/hero-seq/end.webp     : the last frame (the hero without the motion)
#   public/images/hero-seq/end-tall.webp: the last frame cut 4:5 around the subject, for phones,
#                                          with Flow's mark stamped in its corner (the crop loses it)
# Flow's own watermark stays in every 16:9 frame. Prints the frame count for heroSeq.frames.
# Usage: [QUALITY=70] scripts/hero/frames.sh film.mp4 [fps=24] [focus=0.5]   (focus: where the subject of the last frame sits, 0 left to 1 right; QUALITY: WebP quality of the sheets)
set -euo pipefail
IN=${1:?film.mp4}
FPS=${2:-24}
FOCUS=${3:-0.5}
PER=10
HERE=$(cd "$(dirname "$0")" && pwd)
OUT="$HERE/../../public/images/hero-seq"
TMP=$(mktemp -d)
rm -rf "$OUT" && mkdir -p "$OUT"
ffmpeg -loglevel error -i "$IN" -vf "fps=$FPS,scale=1280:720:flags=lanczos" -start_number 0 "$TMP/f%04d.png"
N=$(ls "$TMP"/f*.png | wc -l)
# pad the last sheet with the last frame so every sheet is PER frames tall
LASTF=$(printf "%s/f%04d.png" "$TMP" $((N - 1)))
i=$N
while (( i % PER )); do cp "$LASTF" "$(printf "%s/f%04d.png" "$TMP" $i)"; i=$((i + 1)); done
ffmpeg -loglevel error -start_number 0 -i "$TMP/f%04d.png" -vf "tile=1x$PER" -c:v libwebp -quality ${QUALITY:-70} -compression_level 6 -start_number 0 "$OUT/s%02d.webp"
ffmpeg -loglevel error -i "$LASTF" -c:v libwebp -quality 82 "$OUT/end.webp"
# 4:5 crop, 576 × 720, centred on the subject; the mark stamped 22/23 px in from the corner
ffmpeg -loglevel error -i "$LASTF" -i "$HERE/../film/veo-watermark.png" -filter_complex \
  "[0]crop=576:720:'min(max(1280*$FOCUS-288,0),704)':0[c];[c][1]overlay=W-w-22:H-h-23" \
  -c:v libwebp -quality 82 "$OUT/end-tall.webp"
rm -rf "$TMP"
du -sh "$OUT"
echo "frames: $N  sheets: $(ls "$OUT"/s*.webp | wc -l)"
