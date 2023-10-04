## Contributing

[fork]: /fork
[pr]: /compare
[code-of-conduct]: https://cucumber.io/conduct

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## Setting up your development environment

The project is written in nodejs, so you'll need to install that first.

Clone the repository, then run:

    npm install
    npm test

You will probably see some test failures saying you need to set `GITHUB_TOKEN`. To get this working, you'll need to create a GitHub [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), with the following permissions:

<img width="413" alt="Screenshot 2023-10-04 at 12 54 14 PM" src="https://github.com/cucumber/action-retire-inactive-contributors/assets/19260/4b588886-08ae-4c55-ad26-878d362ab782">

In order to run the tests as-is, you'll need to be given Owner rights to the https://github.com/test-inactive-contributor-action GitHub org.

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
