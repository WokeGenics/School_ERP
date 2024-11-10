export default function AboutMe() {
    return (
      <div className="bg-grey-200 shadow-md p-6 rounded-md text-blue-600  ">
        <h2 className="text-black-600 text-lg font-bold mb-4">About Me</h2>
        <div className="flex items-center mb-4 text-black-600 ">
          <img
            src="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?w=123&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7" // Ensure you place a sample image at /public/profile-pic.png
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4 text-black-600 "
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-600 ">Jessia Rose</h3>
            <p className="text-600">
              Aliquam erat volutpat. Curabitur mattis massa sed laoreet volutpat.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-gray-500">
          <p><strong>Name:</strong> Jessia Rose</p>
          <p><strong>Gender:</strong> Female</p>
          <p><strong>Father Name:</strong> Fahim Rahman</p>
          <p><strong>Mother Name:</strong> Jamalut Kazi</p>
          <p><strong>Date Of Birth:</strong> 07.08.2006</p>
          <p><strong>Religion:</strong> Islam</p>
          <p><strong>Father Occupation:</strong> Graphic Designer</p>
          <p><strong>Email:</strong> jessiarose@gmail.com</p>
          <p><strong>Admission Date:</strong> 05.01.2019</p>
          <p><strong>Class:</strong> 2</p>
          <p><strong>Section:</strong> Pink</p>
          <p><strong>Roll:</strong> 1005</p>
          <p><strong>Address:</strong> House #1, Road #5, Australia</p>
          <p><strong>Phone:</strong> +88 9058418</p>
        </div>
      </div>
    );
  }
  