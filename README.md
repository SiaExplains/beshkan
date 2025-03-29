# Beshkan CLI

🚀 A simple CLI tool to bootstrap a full-stack web application using the [Beshkan App Template](https://github.com/SiaExplains/app-template).

This CLI clones a starter frontend project built with **Next.js** and **TypeScript**, unlinks the Git history, sets up custom metadata like app name and description, and gets you ready to launch your own full-stack application.

---

## ✨ Features

- 🧱 Clones the Beshkan `app-template` repo
- 🧼 Unlinks Git history from the cloned repo
- 💠 Prompts for custom project title and description (or skip via `--default`)
- 📝 Replaces placeholders in the frontend layout file
- 🔧 Sets up the project directory cleanly for your own use

---

## 📆 Installation

```bash
npm install -g beshkan
```

---

## ⚙️ Usage

```bash
beshkan --name my-app
```

This will:
1. Clone the `app-template` into a folder called `my-app`
2. Ask you for the **project title** and **description**
3. Replace placeholders like `<<<APP_NAME>>>` and `<<<APP_DESCRIPTION>>>` in your layout file
4. Unlink the `.git` history so you can start fresh

### Optional Flags

| Flag         | Description                             |
|--------------|-----------------------------------------|
| `--name`     | **(Required)** Your project directory name |
| `--default`  | Use default values for title & description |

---

## 🧪 Example

```bash
beshkan --name portfolio
```

```bash
beshkan --name blog --default
```

---

## 🧹 Template Used

This CLI pulls from:

👉 [https://github.com/SiaExplains/app-template](https://github.com/SiaExplains/app-template)

More templates (backend, database, etc.) coming soon!

---

## 📜 License

MIT

---

## 💬 About

Beshkan CLI is part of the **Beshkan** project – a full-stack site builder that simplifies bootstrapping modern web apps with **Next.js**, **NestJS**, **Express**, **TypeScript**, and more.

Made with ❤️ by [@SiaExplains](https://github.com/SiaExplains)

