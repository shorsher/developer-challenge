# Frontend Challenge
Build a frontend to interact with the Kaleido blockchain backend. 

This repository will generate the Consortium, Environments, and Nodes required for this challenge. Just follow these steps. 
## Setting Up The Blockchain
1. Sign up for an account on [Kaleido](https://console.kaleido.io/)
2. Obtain an API Key by navigating to https://console.kaleido.io/settings/apikeys and clicking + New API Key. 
  *Make sure you copy this api key and keep it safe you'll need it for the next step*
3. Clone this repo. 
4. Install the required node modules by running:

   `npm i`

5. Create the consortia by running:

   `npm run start <YOUR_API_KEY_GOES_HERE>`
   
Congratulations you've now created a consortium with two members, one environment and two nodes. *Note: You might also have a third member called Default Organization* 

After running the script you will see a printout of all the created artifacts. Keep this safe as you'll need the information to interact with your consortium via our APIs
   
## Building your Application

A full list of APIs to interact with your newly created consortium can be found [here](http://console.kaleido.io/docs/docs/api/)

We're not going to give you guidance on what to build, the only requirement is as follows.

### Your application must consume the kaleido APIs to interact with the consortium that this script has created.


## Our Stack & Styles
We encourage you to be creative. We don't want technology to limit that creativity. What follows is some detail about our stack and style guide

**It is important to note that you are by no means required to use this stack or follow this limited style guide**

### Stack
- React
- Redux
- Sass

### Styles

![Product Colors](https://github.com/kaleido-io/frontend-challenge/blob/master/StyleGuide/Colors.png?raw=true 'Product Colors')

![Text Styles](https://github.com/kaleido-io/frontend-challenge/blob/master/StyleGuide/TextStyles.png?raw=true 'Text Styles')
