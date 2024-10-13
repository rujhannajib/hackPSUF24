import React,{useState} from 'react'
import { Link } from 'react-router-dom'


function Header({username}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation = [
        { name: 'Product', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Marketplace', href: '#' },
        { name: 'Company', href: '#' },
      ]
  return (
    <header className="absolute inset-x-0 top-0 z-50">
    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <Link to="/" href="#" className="-m-1.5 p-1.5">
          <span className="sr-only ">Your Company</span>
         
          👾👾👾
          
        </Link>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          {/* <Bars3Icon aria-hidden="true" className="h-6 w-6" /> */}
        </button>
      </div>
      {/* <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </a>
        ))}
      </div> */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          {username} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
    
  </header>
  )
}

export default Header