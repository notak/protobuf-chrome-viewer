# protobuf-chrome-viewer
Quick and dirty chrome extension which detects mime-type application/x-protobuf and offers to render readably. Needs a mime-type of the form:
```
application/x-protobuf;<URL OF .PROTO FILE>#<MESSAGE NAME>
```
where the URL can be relative to the original request.

# Credits
This extension contains the following libraries (all released under the Apache license):
- https://github.com/dcodeIO/long.js
- https://github.com/dcodeIO/bytebuffer.js
- https://github.com/dcodeIO/protobuf.js
