import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setSearcheditems, setSong, setSwitched } from '../redux/features/userSlice'

function SearchPage() {
  const { searchedterm, authtoken, searcheditems } = useSelector((state) => state.user)
  // eslint-disable-next-line 
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  const getItems = async () => {
    let headersList = {
      "auth-token": authtoken,
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "name": searchedterm,
    });

    let response = await fetch("http://localhost:5000/api/songs/searchsong/", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    setItems(data)
    dispatch(setSearcheditems(data))
    console.log(searcheditems);

  }

  useEffect(() => {
    if (searchedterm.length === 0) {
      console.log("nothing to search");
    } else {
      getItems()

    }
    // eslint-disable-next-line
  }, [searchedterm])

  const handleClick = async (n) => {

    console.log(n)
    dispatch(setSong(n))
    dispatch(setSwitched(false))
    document.querySelector('video').pause()
    document.querySelector('video').currentTime = 0
    console.log(searcheditems)
  }

  return (
    <>
      {!searchedterm && <div>
        <h2 style={{ color: 'white' }} className="ms-2 mt-3 ">Discover</h2>
      </div>}
      {searchedterm && searcheditems && <div>
        <h2 style={{ color: 'magenta' }}>Showing Result for {searchedterm}</h2>
      </div>}
      {searchedterm && searcheditems && searcheditems.map((track) => {
        return <div key={track._id} style={{ width: '250px', color: 'white' }}>
          <div className="col-lg-3 col-md-4 text-center col-sm-2">
            <div className="text-center" style={{ width: '250px' }} onClick={() => handleClick(track)}>
              <img src={track.img} alt="" style={{ width: '100px', height: '100px' }} />
            </div>
            <div style={{ width: '250px' }}>

              <h5>{track.name}</h5>
              <h6>{track.artist}</h6>
            </div>
          </div>

        </div>
      })}



    </>
  )
}

export default SearchPage
