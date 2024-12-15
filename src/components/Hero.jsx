export default function Hero(){
  return(
    <>
      <h1>Coffee Tracking for Coffee <abbr title="An entusiast or devotee">Fiends</abbr></h1>
      <div className="benefits-list">
        <h3 className="font-bolder">Try <span className="text-gradient">Caffiend</span> and start...</h3>
        <p>✅ Tracking every coffee</p>
        <p>✅ Measuring your blood caffeine levels</p>
        <p>✅ Costing and quantifying your addition</p>
      </div>
      <div className="card infor-card">
        <div>
        <i className="fa-solid fa-circle-info"></i>
          <h3>Did you know...</h3>
        </div>
        <h5>That caffeine&apos;s half-list is about 5 hours?</h5>
        <p>This means that after 5 hours, half the caffeine you consumed is still in your system,keeping you alert longer! so if you drink a cup of coffee with 200mg of caffeine, 5 hours later, you'll still have about 100mg of caffeine in your system</p>
      </div>
    </>
  )
}