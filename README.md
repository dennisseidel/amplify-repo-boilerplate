# amplify-repo-boilerplate

This project provides a plugin to the [aws amplify cli](https://aws-amplify.github.io/docs/cli/plugins?sdk=js) to add the boilerplate files to a new git repository based on the [Zalando Open Source Best Practices](https://github.com/d10l/new-project) this will make creating new repositories faster and more standardized. This includes:

* Pull Request Template
* Readme Template
* Issue Template
* Crontribting Template
* License Template
* Security Template
* Maintainer Template

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

```
git clone https://github.com/denseidel/amplify-repo-boilerplate.git
npm install -g @aws-amplify/cli
cd amplify-repo-boilerplate
npm install -g
amplify repo add-boilerplate
```


```
mkdir commands/repo
touch commands/repo/add-boilerplate.js  
```

### Prerequisites


```
#nodejs
# aws amplify cli
npm install -g @aws-amplify/cli
```

Further the CLI has internal dependencies to [hygen](https://github.com/jondot/hygen) that is used as the template generator. hygen can be also used standalone without this plugin and the AWS amplify cli.

### Installing

A step by step series of examples that tell you have to get a development env running

Clone the repository

```
git clone https://github.com/denseidel/amplify-repo-boilerplate.git
```

Install the AWS Amplify CLI

```
npm install -g @aws-amplify/cli
```

Go into the folder and install the cli globally: 

```
cd amplify-repo-boilerplate
npm install -g
```

Add new functionality describe in the [aws amplify docs](https://aws-amplify.github.io/docs/cli/plugins?sdk=js).


## Publish to NPM

You can learn how to publish an NPM package here: https://docs.npmjs.com/getting-started/publishing-npm-packages

Once it’s published, anyone can add your new plugin to their system and the Amplify CLI would pickup

```
npm install -g amplify-repo-boilerplate
```


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our process for submitting pull requests to us.

### Develop

This project was build based on my personal need to create a CLI that speeds up my development workflow. To contribute you need basic Javascript & NodeJS skills. Contributions are welcome.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/denseidel/amplify-repo-boilerplate/tags). 

## Authors

See the list of [contributors](CONTRIBUTORS) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to [@zalando-incubator/new-project](https://github.com/zalando-incubator/new-project) for the project template
* Thanks to [@PurpleBooth](https://github.com/PurpleBooth) for the original readme
* Thanks to the [@zalando/Nakadi](https://github.com/zalando/nakadi) project for Contribution file
* Thanks to [@SteveMao](https://github.com/stevemao) for [Issue templates](https://github.com/stevemao/github-issue-templates)
