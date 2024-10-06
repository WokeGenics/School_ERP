import Navbar from '../components/navbar/Navbar';

export default function HomePage() {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Content for the homepage */}
        <h1>Welcome to Our School</h1>
        <p>Explore our programs, learn about our history, and find out how to apply.</p>
      </div>
    </div>
  );
}
