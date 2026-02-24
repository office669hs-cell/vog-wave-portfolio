# 🚀 How to Publish Your Website (GitHub & Vercel)

Your local project is now ready. Follow these exact steps to put it online.

## Step 1: Create a Repository on GitHub
1.  Log in to [GitHub.com](https://github.com).
2.  Click the **+** icon in the top right and select **New repository**.
3.  **Repository name**: `vog-wave-portfolio` (or any name you like).
4.  **Visibility**: Choose **Public**.
5.  **Do NOT** check "Add a README file" or ".gitignore" (we already did this locally).
6.  Click **Create repository**.

## Step 2: Push Your Code (Run these 3 commands)
Copy the commands below and paste them into your terminal (one by one):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vog-wave-portfolio.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username and `vog-wave-portfolio` with your repo name if different)*

## Step 3: Connect to Vercel
1.  Go to [Vercel.com](https://vercel.com) and log in (continue with GitHub).
2.  Click **"Add New..."** -> **"Project"**.
3.  You should see your new `vog-wave-portfolio` repository in the list.
4.  Click **Import**.
5.  Click **Deploy**.

**That's it!** Vercel will give you a live link (e.g., `vog-wave.vercel.app`) in about 30 seconds.
