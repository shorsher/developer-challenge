# Frontend Challenge
Build a frontend to interact with the Kaleido blockchain backend. [You have 2 options](https://github.com/kaleido-io/frontend-challenge/blob/master/README.md#building-your-application)

[Check out the Bonus Points Section](https://github.com/kaleido-io/frontend-challenge/blob/master/README.md#bonus-points)

Good luck, have fun. Please share your final project on public github. 

This repository will generate the Consortium, Environments, and Nodes required for this challenge. Just follow these steps. 
## Setting Up The Blockchain & Creating the Sample Consortium
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

### Option 1 - Visualize the Sample Consortium

If you choose this option, build a frontend application that consumes the Kaleido APIs to visualize the sample consortium

Examples of possible applications:
- A Dashboard that displays the artifacts and their information from the sample consortium. [More information on what these artifacts mean here](http://console.kaleido.io/docs/docs/kaleido/)
- A Notification System that alerts the user when a new member, node or environment is created in the sample consortium
- A Log Viewer / Status application for one specific node in the sample consortium. 
- Something totally different & crazy

A full list of APIs to interact with the sample consortia  can be found [here](http://console.kaleido.io/docs/docs/api_reference/)

You can use the same API key that you generated earlier. You might encounter CORS issues, so we recommend hitting out APIs from a backend application first. Here's an example of how we do it in [node using express and request-promise](https://github.com/kaleido-io/frontend-challenge/blob/master/samples/API-Sample.js). This sample can be run using `npm run sample`


### Option 2 - Interact with the blockchain

You now have a fully operational blockchain. Build a frontend application that interacts with the sample consortiums chain. For inspiration see this [script for deploying a contract](https://github.com/kaleido-io/kaleido-js/blob/master/deploy-transact/test.js)

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

## Bonus Points
The following items will earn you bonus points. They are not requirements, the challenge is 100% completeable without them. 
- Setup your own consortium. The sample consortium is nice, but why not create your own at [console.kaleido.io](https://console.kaleido.io)
- Use our stack
- Use our styles
- Do something totally different & crazy for option 1 or option 2.
- Make your application [Cephalopod](https://en.wikipedia.org/wiki/Cephalopod) themed
- Define your own style library
- Use websockets
- Include animation / Micro-interactions
