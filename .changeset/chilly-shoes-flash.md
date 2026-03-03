---
'@seaguntech/cli': patch
---

Make `components add` idempotent by skipping existing files when the generated
content is unchanged, instead of failing on repeated installs.
