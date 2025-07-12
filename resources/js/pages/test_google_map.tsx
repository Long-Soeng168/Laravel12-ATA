import LocationPicker from '@/components/LocationPicker';
import { useState } from 'react';

function AddGaragePage() {
  const [garageLocation, setGarageLocation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Location:', garageLocation);
  };

  const generateGoogleMapsLink = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <div className="mx-auto mt-8 max-w-3xl rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Select Garage Location</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <LocationPicker
          value={null}
          onChange={(data) => {
            console.log('Selected location:', data);
            setGarageLocation(data);
          }}
          label="Pick a location"
          height="450px"
        />

        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Save Garage Location
        </button>
      </form>

      {garageLocation && (
        <div className="mt-6 rounded bg-gray-100 p-4">
          <h3 className="text-lg font-semibold">Selected Location:</h3>
          <pre className="rounded bg-white p-2 text-sm">{JSON.stringify(garageLocation, null, 2)}</pre>
          <p>
            <strong>Lat:</strong> {garageLocation.coordinates.lat}, <strong>Lng:</strong> {garageLocation.coordinates.lng}
          </p>
          {garageLocation.formatted_address && (
            <p>
              <strong>Address:</strong> {garageLocation.formatted_address}
            </p>
          )}
          <p className="mt-2">
            <a
              href={generateGoogleMapsLink(garageLocation.coordinates.lat, garageLocation.coordinates.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
             {generateGoogleMapsLink(garageLocation.coordinates.lat, garageLocation.coordinates.lng)}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default AddGaragePage;
