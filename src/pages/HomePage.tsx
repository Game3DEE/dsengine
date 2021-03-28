import React from 'react'

import {
  Link
} from 'react-router-dom';

import './HomePage.css'

interface LevelInfo {
  id: string
  description: string
  author: string
}

export default function HomePage() {
  const [ officialLevels, setOfficialLevels ] = React.useState<LevelInfo[]>([])
  const [ localLevels, setLocalLevels ] = React.useState<LevelInfo[]>([])

  React.useEffect(() => {
    // Load list of official (included) levels
    fetch('levels/index.json').then(body => body.json()).then(list => setOfficialLevels(list)).catch(e => {})
    // See if we have anything in localStorage
    try {
      const saveListJson = localStorage.getItem('saveList')
      if (saveListJson) {
        setLocalLevels( JSON.parse(saveListJson) )
      } else {
        setLocalLevels([{
          id: 'untitled',
          description: 'Default local map',
          author: 'You?',
        }])
      }
    } catch(e) {
      console.warn('Failed to access LocalStorage for saved maps:', e)
    }
  }, [setLocalLevels, setOfficialLevels])

  const download = (lvlId: string) => {
    try {
      console.log(`Download: ${lvlId}`)
      const content = localStorage.getItem(lvlId);
      if (content) {
        const a = document.createElement('a')
        a.href="data:text/plain,"+encodeURIComponent(content);
        a.download = `${lvlId}.json`
        a.click()
      }
    } catch(e) {
      console.log(`Download failed:`, e)
    }
  }

  return (
    <div className="container">
      <h1>DSEngine</h1>
      <p>If you feel you created a cool map, click the download button below, and either create a Merge Request or send me an <a href="mailto:ithamar@game3dee.com?subject=DSEngine">email</a> with the level file.</p>
      <h3>Official levels</h3>
      <sub>These are the levels provided with DSEngine</sub>
      <div className="Rtable Rtable--4cols">
        {officialLevels.map(lvl => (
            <div key={`${lvl.id}`}>
              <div  className="Rtable-cell"><h3>{lvl.id}</h3></div>
              <div key={`${lvl.id}2`} className="Rtable-cell">{lvl.description}</div>
              <div key={`${lvl.id}3`} className="Rtable-cell">{lvl.author}</div>
              <div key={`${lvl.id}4`} className="Rtable-cell">
                <Link to={`/edit/${lvl.id}`}>Edit</Link> / 
                <Link to={`/play/${lvl.id}`}>Play</Link>
              </div>
            </div>
        ))}
      </div>

      <h3>Local levels</h3>
      <sub>Levels created in this browser, only accessible by you</sub>
      <div className="Rtable Rtable--4cols">
        {localLevels.map(lvl => (
            <div key={`${lvl.id}`}>
              <div  className="Rtable-cell"><h3>{lvl.id}</h3></div>
              <div key={`${lvl.id}2`} className="Rtable-cell">{lvl.description}</div>
              <div key={`${lvl.id}3`} className="Rtable-cell">{lvl.author}</div>
              <div key={`${lvl.id}4`} className="Rtable-cell">
                <Link to={`/edit/${lvl.id}`}>Edit</Link> / 
                <Link to={`/play/${lvl.id}`}>Play</Link> / 
                <Link to="" onClick={event => {
                  event.stopPropagation()
                  download(lvl.id)
                }}>Download</Link>
              </div>
            </div>
        ))}
      </div>

    </div>
  )
}
