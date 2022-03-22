# Release Process 

Crayons will be having 2 branches:

1) **master** - release branch
2) **next** - pre-release branch (experimental branch)

**Steps**:

1. Any new PRs will be merged to the `next` branch after approval. Feature, refactor, and bug fix branches are created from `next`

3. **Weekly pre-release**

   1. The `next` branch will be used for pre-release. (3.1.1-beta.1).
   2. It will be published to npm with dist-tag as `next` - 3.1.1-beta.1@next.

4. **Stable release**
   1. The `next` branch will be merged to the `master` branch.
   2. The pre-release version will be graduated to a stable release version (3.1.2).
   3. It will be published to npm with dist-tag as `latest` - 3.1.2

Merge `main` branch into `next` branch post releasing stable version.

The above release process is described as below:

<img alt="Release Process" src=".github/assets/crayons-v3-release.svg">