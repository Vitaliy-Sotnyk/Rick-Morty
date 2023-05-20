// import { useState, useEffect } from 'react';
// import Logo from './Logo/Logo';
// import Form from './form/Form';
// import PersonList from './Person/PesronList';
// import LoginGoogle from './Login/LoginGoogle';

// function App({ person, setPerson }) {
//   const [loginImg, setLoginImg] = useState('');
//   const [search, setSearch] = useState('');
//   const [searchEror, setSearchEror] = useState('')
//   const [searchSubmit, setSearchSubmit] = useState('');
//   const [loadStatus, setLoadStatus] = useState(() => JSON.parse(localStorage.getItem('sortData')));

//   const apiHref = 'https://rickandmortyapi.com/api/character';

//   useEffect(() => {
//     const getData = async () => {
//       let sortData = [];
//       if (!loadStatus) {
//         const path = await fetch(apiHref);
//         const data = await path.json();
//         if (!searchSubmit) {
//           sortData = data.results
//         } else {
//           data.results.map(e => {
//             if (e.name.toLowerCase().includes(searchSubmit.toLowerCase())) {
//               sortData.push(e)
//             }
//             return sortData;
//           })
//           localStorage.setItem('sortData', JSON.stringify(sortData))
//         }
//       } else {
//         sortData = loadStatus;
//         if (searchSubmit) {
//           setLoadStatus('')
//         }
//       }
//       if (sortData.length) {
//         setSearchEror('')
//         sortData.sort((a, b) => {
//           if (a.name < b.name) {
//             return -1;
//           }
//           if (a.name > b.name) {
//             return 1;
//           }
//           return 0;
//         })
//       } else {
//         setSearchEror(<h2 className='errorSearch'>Wrong name or value is not found</h2>)
//       }
//       setPerson(sortData);
//     }
//     getData()
//   }, [apiHref, loadStatus, searchSubmit, setPerson])

//   const getSearch = (e) => {
//     e.preventDefault();
//     setSearchSubmit(search)
//     setSearch('')
//   }

//   return (
//     <div className="App">
//         <LoginGoogle setLoginImg={setLoginImg} />
//         <header className='header'>
//           <Logo />
//           <Form
//             getSearch={getSearch}
//             search={search}
//             setSearch={setSearch}
//             loginImg={loginImg} />
//         </header>
//         {searchEror ? searchEror :
//             <main className='main'>
//               {person.map((e) => {
//                 return <PersonList key={e.id}
//                   element={e}
//                 />
//               })}
//             </main>
//         }
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import './App.scss';
import Logo from './Logo/Logo';
import Loader from './Loader/Loader';
import ScrollButton from './ScrollButton/ScrollButton';
import Form from './Form/Form';
import PersonList from './Person/PesronList';
// import LoginGoogle from './Login/LoginGoogle';

function App({ person, setPerson }) {
  const [loginImg, setLoginImg] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posibleLoadMore, setPosibleLoadMore] = useState(true);
  const [jsonPage, setJsonPage] = useState(1);
  const [searchSubmit, setSearchSubmit] = useState('');
  // const [loadStatus, setLoadStatus] = useState(() => JSON.parse(localStorage.getItem('sortData')));




  useEffect(() => {
    if(!searchSubmit || searchSubmit===''){
      const apiHrefPage = `https://rickandmortyapi.com/api/character/?page=${jsonPage}`;
      fetch(apiHrefPage)
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            if (jsonPage === 1) {
              setPerson(data.results);
              setPosibleLoadMore(true)
            } else {
              data.results.map(e => {
                return setPerson(oldArr => [...oldArr, e]);
              })
            }
          })
          .catch(() => {
            setIsLoaded(true);
            setError(true);
            setPerson([]);
          })
    } else {
      const apiHrefName = `https://rickandmortyapi.com/api/character/?name=${searchSubmit}`;
      fetch(apiHrefName)
      .then(res => res.json())
      .then(
        (data) => {
          let sortData = [];
          setIsLoaded(true);
          setError(false);
          data.results.map(e => {
            if (e.name.toLowerCase().split(' ')[0] === searchSubmit.toLowerCase() || 
              e.name.toLowerCase().split(' ')[1] === searchSubmit.toLowerCase()) {
              sortData.push(e)
            }
            return sortData;
          })
          if(sortData.length){
            setPosibleLoadMore(false);
            setPerson(sortData);
          } else {
            setError(true);
            setPerson('');
          }
        },
      )
      .catch(() => {
        setIsLoaded(true);
        setError(true);
        setPerson([]);
      })
    }
  }, [setPerson, jsonPage, searchSubmit, setError])

  const loadMore = () => {
    setJsonPage(e => e = jsonPage + 1);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setSearchSubmit(search)
    setSearch('')
  }

  return (
    <div className="App">
      {/* <LoginGoogle setLoginImg={setLoginImg} /> */}
      <Logo />
      <Form  
        getSearch={getSearch}
        search={search}
        setSearch={setSearch}
        loginImg={loginImg}/>
      {isLoaded ?
        error ? <h2 className='errorSearch'>Wrong name or value is not found</h2> : 
        <main >
          <section className='main-section'>
            {person.map((e) => {
              return <PersonList key={e.id}
                element={e}
              />
            })
            }
          </section>
          <nav className='main-buttons'>
            {posibleLoadMore?
            <button className="main-buttons__load-more" onClick={loadMore}>Load More</button>
            : null}           
            <ScrollButton />
          </nav>
        </main>
        : <Loader />}
    </div>
  );
}

export default App;

