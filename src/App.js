import './App.css';
import React from 'react';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') || 'React'
  // );

  // React.useEffect(() => {
  //   localStorage.setItem('search', searchTerm);
  // }, [searchTerm]);

  const handleSearch = (event) => {
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

const Search = ({ search, onSearch }) => (
  <>
    <lable htmlFor="search">Search: </lable>
    <input 
      id="search" 
      type="text" 
      value={search} 
      onChange={onSearch}
    />
  </>
);

const List = ({ list }) => (
  <ul>
    {list.map(({objectID, ...item}) => (
      <Item key={objectID} {...item} />
    ))}
  </ul>
);

const Item = ({ key, title, url, author, num_comments, points }) => (
  <li key={key}>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

export default App;
