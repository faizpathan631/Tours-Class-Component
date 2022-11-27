import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showShortInfo: [],
      showAllTourDesciption: false,
    }
  }

  async fetchTours() {
    try {
      let response = await fetch('https://course-api.com/react-tours-project')
      let tours = await response.json()
      tours && this.setState((prev) => ({ ...prev, showShortInfo: tours }))
      tours && sessionStorage.setItem('dataRep', JSON.stringify(tours))
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.fetchTours()
  }
  delete(id) {
    let resultData = this.state.showShortInfo.filter((i) => i.id !== id)
    this.setState((prev) => ({ ...prev, showShortInfo: resultData }))
  }
  updateShortInfo(id) {
    let allData = this.state.showShortInfo
    let index = this.state.showShortInfo.findIndex((i) => i.id === id)
    let idData = this.state.showShortInfo.filter((i) => i.id === id)
    let info = idData[0]
    let newIdData = { ...info, info: info.info.substring(0, 200) }
    allData[index] = newIdData
    this.setState((prev) => ({
      ...prev,
      data: prev.data,
      showShortInfo: allData,
    }))
  }
  updateShowFullInfo(id) {
    let res = JSON.parse(sessionStorage.getItem('dataRep'))
    let allData = this.state.showShortInfo
    let index = this.state.showShortInfo.findIndex((i) => i.id === id)
    let idData = res.filter((i) => i.id === id)
    allData[index] = idData[0]
    this.setState((prev) => ({
      ...prev,
      showShortInfo: allData,
    }))
  }
  render() {
    return (
      <>
        {this.state.showShortInfo.length ? (
          <>
            {this.state.showShortInfo.map((Data) => (
              <div key={Data.id}>
                <button onClick={() => this.delete(Data.id)}>
                  Delete this from tour
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() =>
                    Data.info.length > 200
                      ? this.updateShortInfo(Data.id)
                      : this.updateShowFullInfo(Data.id)
                  }
                >
                  {Data.info.length > 200
                    ? 'Read less about Tours'
                    : 'Read more about Tours'}
                </button>
                <br />
                <span>Name of tour :</span>&nbsp;&nbsp;
                <span>{Data.name}</span>
                <div>Info of tour :</div>
                <div>{Data.info}</div>
                <span>Price of tour :</span>&nbsp;&nbsp;
                <span>{Data.price}</span>
                <br />
                <hr />
              </div>
            ))}
          </>
        ) : (
          !this.state.showShortInfo.length && <>Loading....</>
        )}
      </>
    )
  }
}
