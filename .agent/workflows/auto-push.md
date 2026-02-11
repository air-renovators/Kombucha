---
description: Automatically commit and push changes to GitHub after code modifications
---

# Auto-Push Workflow

## Policy
Whenever code changes are made to the Kombucha project, automatically commit and push them to GitHub.

## Steps

1. Make the requested code changes
2. Stage all changes: `git add .`
3. Commit with a descriptive message: `git commit -m "feat: [description of changes]"`
4. Push to GitHub: `git push origin main`

## Commit Message Format
Use conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code refactoring
- `docs:` for documentation changes
- `style:` for formatting changes
- `chore:` for maintenance tasks

## Notes
- This workflow applies to all code changes made by the assistant
- The GitHub token is already configured in the remote URL
- Changes are pushed to the `main` branch
