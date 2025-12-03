# Packaging Your Web App for Android (Google Play Store) using Capacitor

This guide provides step-by-step instructions to wrap your existing web application into a native Android app (`.aab` bundle) suitable for submission to the Google Play Store. We will use Capacitor, a modern tool for building hybrid apps.

## The Hybrid App Approach

You cannot directly convert a web project into an APK/AAB. Instead, you wrap it in a native "shell." This shell is a minimal Android app containing a `WebView` (an embedded browser) that runs your entire web application. Capacitor automates this process and provides a bridge to access native device features if needed.

---

### Step 1: Prerequisites

Ensure you have the necessary native development tools installed on your machine.

1.  **Node.js**: You already have this for your web project.
2.  **Android Studio**: Download and install the official IDE for Android development from the [Android developer website](https://developer.android.com/studio). This includes the Android SDK.
3.  **Java Development Kit (JDK)**: Android Studio typically bundles or prompts you to install the correct version (e.g., JDK 17 or higher).

---

### Step 2: Prepare Your Web App for Production

Before wrapping, you need a static, production-ready build of your web application. This process compiles your TypeScript, React components, and assets into plain HTML, CSS, and JavaScript.

1.  **Build the Project**:
    Run your project's build script from your terminal. If you are using a standard setup like Vite or Create React App, the command is usually:
    ```bash
    npm run build
    ```
2.  **Verify Output**:
    This command will create a `dist` or `build` directory in your project root. This folder contains your complete, optimized web app.

---

### Step 3: Integrate Capacitor into Your Project

Now, add Capacitor's tools and the Android platform to your existing project.

1.  **Install Capacitor CLI and Core**:
    ```bash
    npm install @capacitor/cli @capacitor/core
    ```

2.  **Initialize Capacitor**:
    Run the `init` command. The CLI will ask for some information about your app.
    ```bash
    npx cap init
    ```
    *   **App Name**: `Where Winds Meet Companion`
    *   **App ID**: A unique, reverse-domain style package name (e.g., `com.yourname.wwmcompanion`). **This is your app's unique identifier on the Play Store.**
    *   **Web Asset Directory**: The name of your build output folder (e.g., `dist`).

3.  **Install and Add the Android Platform**:
    This command creates a complete, native Android project inside an `android` directory in your project root.
    ```bash
    npm install @capacitor/android
    npx cap add android
    ```

---

### Step 4: Build and Sync Your Web Assets

Whenever you make changes to your web code, you must repeat this two-step process to update the native Android project.

1.  **Rebuild Your Web App**:
    ```bash
    npm run build
    ```

2.  **Sync Assets with Capacitor**:
    This command copies your latest web build (`dist` folder) into the native Android project.
    ```bash
    npx cap sync
    ```

---

### Step 5: Build and Sign in Android Studio

This is the final stage where you create the shareable App Bundle.

1.  **Open the Native Project**:
    Let Capacitor open Android Studio for you with the correct project loaded.
    ```bash
    npx cap open android
    ```
    Wait for Android Studio to finish indexing and syncing the project (it may download dependencies, which can take a few minutes).

2.  **Generate a Signed App Bundle**:
    The Google Play Store requires a signed **Android App Bundle (`.aab`)**.

    *   In Android Studio's top menu, go to **Build > Generate Signed Bundle / APK...**.
    *   Select **Android App Bundle** and click **Next**.
    *   You will be prompted to create or use a **Key store**.
        *   If this is your first time, click **Create new...**.
        *   Fill out the form to create a new keystore file (`.jks`).
        *   **CRITICAL**: Save this keystore file and its passwords securely. You **MUST** use this same key to sign all future updates for this app. **If you lose it, you cannot update your app.** Back it up!
    *   After creating/selecting your keystore, the fields will be filled. Click **Next**.
    *   Choose the build variant **`release`** and click **Create**.

Android Studio will now build your project. When it's finished, it will show a notification with a link to locate the generated `.aab` file (usually found in `android/app/release/app-release.aab`).

---

### Step 6: Publish to the Google Play Store

You now have the signed `app-release.aab` file. You can upload this file to your **Google Play Console** account to begin the publishing process, which includes creating a store listing, setting up content ratings, and rolling out to production.
