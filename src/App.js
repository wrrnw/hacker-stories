import './App.css';
import React from 'react';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  // A
  const handleSearch = (event) => {
    // C
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter(story => (
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  console.log("App Render");

  return (
    <div className="App">
      <h1>Hacker Stories</h1>
      {/* //B */}
      <Search search={searchTerm} onSearch={handleSearch}/>
      <p>Search Item {searchTerm}</p>
      <hr /> 
      <List list={searchedStories}/>
    </div>
  );
};

const Search = (props) => {
  console.log("Search Render");

  return (
    <div>
      <lable htmlFor="search">Search: </lable>
      <input id="search" type="text" value={props.search} onChange={props.onSearch}/>
    </div>
  );
};

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = (props) => (
  <li key={props.item.objectID}>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App;
