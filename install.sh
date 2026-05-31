#!/usr/bin/env bash

# TODO: https://ask-ell.atlassian.net/browse/ASK-10

curl -o ask https://raw.githubusercontent.com/ask-ell/ask/refs/heads/release/bin

BINARY_FILE_PATH=/usr/local/bin/ask

sudo mv ask "$BINARY_FILE_PATH"

sudo chown $USER:$USER "$BINARY_FILE_PATH"

chmod +x "$BINARY_FILE_PATH"