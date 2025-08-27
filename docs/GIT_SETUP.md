# Need to make sure .sh files are pushed with proper executable permissions
```bash
# In local repository
git config core.fileMode true

# Make sure the repository has a .gitattributes file with the contents:
*.sh text eol=lf executable

# For any existing script files, e.g. in scripts/*.sh
# run the following to force git to update their executable status:
git update-index --chmod=+x scripts/*.sh
git commit -m "update file permissions"
git push
```