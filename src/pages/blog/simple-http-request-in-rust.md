---
layout: ../../layouts/BlogLayout.astro
id: 2
title: Simple HTTP request in Rust
category: blog
description: The easiest way to make an HTTP Request in Rust
slug: simple-http-request-in-rust
date: 3 October 2021
tags:
  [
    "RustProgramming",
    "HTTPRequest",
    "WebDevelopment",
    "ProgrammingLanguages",
    "RustLang",
    "HTTPClient",
    "RustDevelopment",
    "CodingTutorial",
    "APIIntegration",
    "ProgrammingTips",
    "NetworkProgramming",
    "RustCode",
    "TechHowTo",
  ]
---

First Create a new project using cargo

```bash
cargo new httprequest
```

Next we are gonna install some depedencies like reqwest and Tokio (To make an HTTP Request),serde and serde_json (To convert the data to JSON format).

```toml
[package]
name = "httprequest"
version = "0.1.0"
edition = "2021"

[dependencies]
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

And then run the project, to install the depedencies

```bash
cargo run
```

Next we are going to write code to make an HTTP Request.

In this example i'm using https://jsonplaceholder.typicode.com/posts for the JSON API,you can use any API you want.

First let's see our JSON response,the plan is we are going to convert this JSON Structure to Rust Struct,You can use tools Like https://transform.tools/json-to-rust-serde, because im gonna use that website to convert my JSON structure to Rust Struct.

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
  ...
]
```

After that the result looks like this

```rust
use serde_derive::Deserialize;
use serde_derive::Serialize;

pub type Root = Vec<Root2>;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Root2 {
    pub user_id: i64,
    pub id: i64,
    pub title: String,
    pub body: String,
}

```

And then you can Modify the struct

```rust
use serde::{Deserialize, Serialize};

type Users = Vec<User>;
#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct User {
    user_id: i64,
    id: i64,
    title: String,
    body: String,
}
```

Next let's write our code

```rust
use reqwest;
use serde::{Deserialize, Serialize};

type Users = Vec<User>;
#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct User {
    user_id: i64,
    id: i64,
    title: String,
    body: String,
}

#[tokio::main]
async fn main() {
    let users = reqwest::get("https://jsonplaceholder.typicode.com/posts")
        .await
        .unwrap()
        .json::<Users>()
        .await;

    println!("{:#?}", users);
}

```

run the project

```bash
cargo run
```

And the result looks like this, **congratulations** , you have successfully make a simple HTTP Request using Rust

```rust
Ok(
    [
        User {
            user_id: 1,
            id: 1,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
        User {
            user_id: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        },
        ...
    ]
)

```

You can also map the data using forloop

```rust
#[tokio::main]
async fn main() {
    let users = reqwest::get("https://jsonplaceholder.typicode.com/posts")
        .await
        .unwrap()
        .json::<Users>()
        .await;

    for user in users.iter() {
        for us in user.iter() {
            println!("{:#?}", us.id);
        }
    }
}

```

Refrences :

- https://stackoverflow.com/questions/14154753/how-do-i-make-an-http-request-from-rust
- https://blog.logrocket.com/making-http-requests-rust-reqwest/
