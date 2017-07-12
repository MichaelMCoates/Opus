## Opus

### Background

Opus is an artist-recommendation application that allows the user to easily discover their next favorite musician, using the Spotify Web API and D3.js.


### Functionality & MVP  

With Opus, users will be able to:

- [ ] Add artists to the interface
- [ ] Receive recommended artists based on their selections
- [ ] Preview songs from artists on the interface
- [ ] Receive recommended artists based on their Spotify profile if they log in

In addition, this project will include:

- [ ] A sidebar with selector options
- [ ] A production README

### Wireframes

This app will consist of a single screen, with a large main display interface, top nav bar, and bottom playbar. The top nav bar will contain the logo, search, log in, and configuration settings (for amount of fetching and other options). The bottom playbar will contain artist information, songs available for preview, and play controls. The interface will consist of D3-generated nodes with pictures of the artists inside of them, and text displaying their name. Artists may be linked to multiple artists based on similar artist recommendations.

![wireframes](https://github.com/MichaelMCoates/Opus/blob/master/Screen%20Shot%202017-07-05%20at%205.18.19%20AM.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- `D3.js` for rendering nodes,
- `JavaScript` for fetching data,
- `React` and `Redux` for possibly managing state,
- `Spotify Web API` for artist information, song samples, and artist recommendations
- `Songkick API` for concert information and suggestions (BONUS)
- `Google Maps API` for concert venue location information/rendering (BONUS)

In addition to the entry file, there will be two scripts involved in this project:

`D3.js`: this script will handle the logic for creating and updating the necessary `D3.js` elements and rendering them to the DOM.

`artist.js`: this script will handle the logic behind the scenes for fetching and using artist data. It will use the `Spotify Web API` to do so.


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `D3.js` installed. Write a basic entry file and the bare bones of the website structure and script files described above. Learn the basics of `D3.js` and the `Spotify Web API`.  Goals for the day:

- Fetch Basic Artist Information from the `Spotify Web API`.
- Begin rendering D3.js.

**Day 2**: Dedicate this day to fetching all necessary Artist Data with search, and learning the `D3.js` API. Goals for the day:

- Be able to fetch all necessary Artist and Recommendation Data from search.
- Get basic audio playing on the page
- Render nodes with artist images in them.
- Be able to add and remove nodes from the DOM.

**Day 3**: Fine-tune the `D3.js` visuals. Goals for the day:

- Set up multiple connections between artists if an artist is on the recommendation list for more than one artist.
- Have the `D3.js` visualization reorganize itself based on weight and number of connections.


**Day 4**: Loop in recommendation weighting based on upcoming concert and location data with the `Songkick API`. Style the frontend, making it polished and professional.  Goals for the day:

- Finish styling all bars and interface.
- Add links to upcoming concerts and provide ability to toggle concert searching on and off.


### Bonus features

Some anticipated updates are:

- [ ] Adding ability for user to log in to their Spotify and receive an automatic node-field based on favorite artists.
- [ ] Incorporating the `Songkick API` to weight/filter artists based on those that are performing in the user's city in the coming months.
- [ ] Adding the `Google Maps API` to the `Songkick API` functionality to see proximity of concert venue to user
