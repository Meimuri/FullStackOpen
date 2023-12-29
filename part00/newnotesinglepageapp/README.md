```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa / Content Type JSON
    activate server
    server-->>browser: Responds with 201 status code
    deactivate server
```
