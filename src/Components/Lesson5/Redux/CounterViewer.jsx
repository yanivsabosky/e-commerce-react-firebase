import { useSelector } from 'react-redux';

function CounterViewer() {
  const storeData = useSelector(state => state); // או: s => s
  return (
    <div style={{ backgroundColor: "blue" }}>
      <h1>CounterViewer</h1>
      <h1>Counter: {storeData}</h1>
    </div>
  );
}

export default CounterViewer;
