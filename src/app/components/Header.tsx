function Header() {
  return (
    <header>
    <div className="bg-gray-200 py-4 text-black-20 text-center">
        <h1 className="text-2xl font-semibold">GitHub Issue Manager</h1>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
  <h2 className="text-xl font-semibold mb-2">Label issues for new Contributors</h2>
  <p className="text-gray-600">
    Now, Github will help potential first-time contributors{' '}
      discover issues
       labelled with
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 ml-2 rounded-md">
        good first issue
      </button>
  </p>
</div>
    </header>
  )
}

export default Header