'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, Filter, ChevronDown, Star, Clock, BarChart, Zap, Users, Check, X, Plus, ShoppingCart, Trophy, Sparkles, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// import { useCart } from '@/context/CartContext'

// Mock data for courses
const COURSES = [
  {
    id: '1',
    title: 'Complete JavaScript Course 2023: From Zero to Expert!',
    description: 'Learn web development from scratch to advanced',
    instructor: 'Jonas Schmedtmann',
    duration: '48 hours',
    students: 428431,
    rating: 4.8,
    reviews: 154392,
    price: 89.99,
    discountPrice: 14.99,
    originalPrice: 129.99,
    level: 'All Levels',
    topics: ['JavaScript', 'Web Development'],
    image: '/images/fullstack-dev.jpg',
    tag: 'Bestseller',
    highlights: [
      'Build 25+ projects from scratch',
      'Learn HTML, CSS, JavaScript fundamentals',
      'Master React and Node.js frameworks',
      'Deploy real applications to the web'
    ]
  },
  {
    id: '2',
    title: 'React - The Complete Guide 2023 (incl. React Router & Redux)',
    description: 'Master the principles of modern UI/UX design',
    instructor: 'Maximilian Schwarzmüller',
    duration: '32 hours',
    students: 856,
    rating: 4.7,
    reviews: 187392,
    price: 94.99,
    discountPrice: 13.99,
    originalPrice: 149.99,
    level: 'Intermediate',
    topics: ['React', 'JavaScript', 'Web Development'],
    image: '/course-2.jpg',
    tag: 'New',
    highlights: [
      'Create beautiful user interfaces',
      'Learn design principles and psychology',
      'Master Figma and design tools',
      'Build a professional design portfolio'
    ]
  },
  {
    id: '3',
    title: 'The Complete 2023 Web Development Bootcamp',
    description: 'Learn data analysis and machine learning basics',
    instructor: 'Dr. Angela Yu',
    duration: '40 hours',
    students: 978,
    rating: 4.9,
    reviews: 232392,
    price: 129.99,
    discountPrice: 14.99,
    originalPrice: 199.99,
    level: 'Advanced',
    topics: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    image: '/course-3.jpg',
    highlights: [
      'Master Python for data analysis',
      'Learn statistical analysis techniques',
      'Build machine learning models',
      'Work with real-world datasets'
    ]
  },
  {
    id: '4',
    title: 'Python Programming Masterclass',
    description: 'From Python basics to advanced frameworks',
    instructor: 'Sarah Wilson',
    duration: '36 hours',
    students: 1432,
    rating: 4.8,
    reviews: 154392,
    price: 109.99,
    discountPrice: 13.99,
    originalPrice: 189.99,
    level: 'Beginner',
    topics: ['Python', 'Programming'],
    image: '/course-4.jpg',
    highlights: [
      'Learn Python from zero to hero',
      'Build 15+ real-world applications',
      'Master OOP and advanced concepts',
      'Learn popular Python libraries'
    ]
  },
  {
    id: '5',
    title: 'The Complete JavaScript Course 2025: From Zero to Expert',
    description: 'Master modern JavaScript and frameworks',
    instructor: 'Jonas Schmidtmann',
    duration: '28 hours',
    students: 220685,
    rating: 4.7,
    reviews: 154392,
    price: 75.99,
    discountPrice: 14.99,
    originalPrice: 129.99,
    level: 'Advanced',
    topics: ['JavaScript', 'Web Development'],
    image: '/images/advanced-js.jpg',
    tag: 'Bestseller',
    highlights: [
      'Deep dive into JavaScript internals',
      'Master closures, prototypes and this',
      'Learn modern ES6+ features',
      'Build advanced applications'
    ]
  },
  {
    id: '6',
    title: 'The Web Developer Bootcamp 2025',
    description: 'Build cross-platform mobile apps with React',
    instructor: 'Colt Steele',
    duration: '38 hours',
    students: 279330,
    rating: 4.7,
    reviews: 187392,
    price: 75.99,
    discountPrice: 13.99,
    originalPrice: 129.99,
    level: 'Intermediate',
    topics: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    image: '/course-6.jpg',
    tag: 'Bestseller',
    highlights: [
      'Build iOS and Android apps with one codebase',
      'Master React Native components',
      'Learn state management with Redux',
      'Publish apps to app stores'
    ]
  }
]

// All available topics from courses
const ALL_TOPICS = Array.from(new Set(COURSES.flatMap(course => course.topics)))

// All available levels
const ALL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels']

// Related topics for the cart popup
const relatedTopics = [
  'JavaScript',
  'Node.js',
  'MongoDB',
  'CSS',
  'Front End Web Development'
]

export default function CoursesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 70])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = useState(COURSES)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 9
  
  // Accordion state
  const [topicsOpen, setTopicsOpen] = useState(true)
  const [levelsOpen, setLevelsOpen] = useState(true)
  const [durationOpen, setDurationOpen] = useState(true)

  // Course detail popup state
  const popupRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [hoveredCourse, setHoveredCourse] = useState<typeof COURSES[0] | null>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [isHoveringPopup, setIsHoveringPopup] = useState(false)
  
  // Cart popup state
  const { items: cartItems, addToCart, isInCart, totalItems } = useCart()
  const [showCartPopup, setShowCartPopup] = useState(false)
  const [addedCourse, setAddedCourse] = useState<typeof COURSES[0] | null>(null)
  const [recommendedCourses, setRecommendedCourses] = useState<typeof COURSES[0][]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  // Apply filters and sorting
  useEffect(() => {
    let result = [...COURSES]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.instructor.toLowerCase().includes(query) ||
        course.topics.some(topic => topic.toLowerCase().includes(query))
      )
    }
    
    // Apply topic filter
    if (selectedTopics.length > 0) {
      result = result.filter(course => 
        selectedTopics.some(topic => course.topics.includes(topic))
      )
    }
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      result = result.filter(course => 
        selectedLevels.includes(course.level)
      )
    }
    
    // Apply duration filter
    result = result.filter(course => {
      const hours = parseInt(course.duration.split(' ')[0])
      return hours >= durationRange[0] && hours <= durationRange[1]
    })
    
    // Apply sorting
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.students - a.students)
        break
      case 'highest-rated':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
      case 'price-low':
        result.sort((a, b) => a.discountPrice - b.discountPrice)
        break
      case 'price-high':
        result.sort((a, b) => b.discountPrice - a.discountPrice)
        break
    }
    
    setFilteredCourses(result)
    
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [searchQuery, sortBy, durationRange, selectedTopics, selectedLevels])

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
  
  // Function to change page
  const paginate = (pageNumber: number) => {
    // Ensure page number is within valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      // Scroll to top of results when changing page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Function to render pagination numbers
  const renderPaginationNumbers = () => {
    const pageNumbers = []
    
    // Always show first page
    pageNumbers.push(
      <button
        key="first"
        onClick={() => paginate(1)}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 
            ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        1
      </button>
    )
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-2">
          ...
        </span>
      )
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i 
                ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {i}
          </button>
        )
      }
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-2">
          ...
        </span>
      )
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key="last"
          onClick={() => paginate(totalPages)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages 
              ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {totalPages}
        </button>
      )
    }
    
    return pageNumbers
  }

  // Toggle topic selection
  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic))
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }
  }

  // Toggle level selection
  const toggleLevel = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(l => l !== level))
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }

  // Function to handle mouse enter for course card
  const handleMouseEnter = (course: typeof COURSES[0], event: React.MouseEvent) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    setPopupPosition({
      x: rect.right,
      y: Math.max(0, rect.top - 50) // Adjust vertical position to be more centered
    })
    setHoveredCourse(course)
  }

  // Function to handle mouse leave for course card
  const handleMouseLeave = () => {
    // Only hide the popup if we're not hovering over the popup itself
    if (!isHoveringPopup) {
      // Use a slight delay to allow mouse to move to popup
      timeoutRef.current = setTimeout(() => {
        setHoveredCourse(null)
      }, 100)
    }
  }

  // Function to get recommended courses based on the added course
  const getRecommendedCourses = (course: typeof COURSES[0]): typeof COURSES[0][] => {
    // Get courses from the same level or with related tags
    const relatedCourses = COURSES.filter(c => 
      c.id !== course.id && (c.level === course.level || c.tag === course.tag)
    )
    
    // Shuffle and take 2-3 courses
    return relatedCourses
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
  }

  // Add a click handler for the "Add to cart" button
  const handleAddToCart = (course: typeof COURSES[0]) => {
    // Format the course to match CartContext expectations if needed
    const cartCourse = {
      ...course,
      originalPrice: course.originalPrice || course.price * 1.7 // Fallback if originalPrice not set
    }
    
    // Add the course to the cart using the context
    addToCart(cartCourse)
    
    // Set the added course for the popup
    setAddedCourse(course)
    
    // Get recommended courses
    const recommended = getRecommendedCourses(course)
    setRecommendedCourses(recommended)
    
    // Calculate total price (added course + recommended courses)
    const total = course.discountPrice + recommended.reduce((sum, c) => sum + c.discountPrice, 0)
    setTotalPrice(total)
    
    // Show the cart popup
    setShowCartPopup(true)
    
    // Close the course detail popup
    setHoveredCourse(null)
    setIsHoveringPopup(false)
  }

  const handleCloseCartPopup = () => {
    setShowCartPopup(false)
  }

  const handleGoToCart = () => {
    // Navigate to the cart page using Next.js router
    router.push('/cart')
    setShowCartPopup(false)
  }

  const handleAddAllToCart = () => {
    // Add all recommended courses to cart using the context
    recommendedCourses.forEach(course => {
      if (!isInCart(course.id)) {
        const cartCourse = {
          ...course,
          originalPrice: course.originalPrice || course.price * 1.7
        }
        addToCart(cartCourse)
      }
    })
    
    // Navigate to cart page
    router.push('/cart')
    setShowCartPopup(false)
  }

  // Course Detail Popup Component
  const CourseDetailPopup = ({ course }: { course: typeof COURSES[0] }) => (
    <div 
      ref={popupRef}
      className="fixed z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
      style={{
        top: `${popupPosition.y}px`,
        left: `${popupPosition.x}px`,
        transform: 'translateX(10px)'
      }}
      onMouseEnter={() => {
        setIsHoveringPopup(true)
        // Clear any pending timeout that would hide the popup
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }}
      onMouseLeave={() => {
        setIsHoveringPopup(false)
        setHoveredCourse(null)
      }}
    >
      <div className="mb-3">
        <span className="text-xs font-medium py-1 px-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white">
          {course.level}
        </span>
        <span className="ml-2 text-sm text-gray-500">Updated February 2025</span>
      </div>
      
      <h3 className="font-bold text-xl mb-2 text-gray-900">{course.title}</h3>
      <div className="text-sm text-gray-600 mb-4">{course.description}</div>
      
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 font-medium">{course.rating}</span>
        </div>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
        <span className="mx-2 text-gray-400">•</span>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-500">{course.duration}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="font-semibold mb-2">What you'll learn:</div>
        <ul className="space-y-2">
          {course.highlights?.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-600">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          <span className="text-sm text-orange-500">{course.instructor.split(',')[0]}</span>
        </div>
        <span className="font-bold text-2xl text-orange-600">${course.discountPrice}</span>
      </div>
      
      <button 
        className={`w-full py-2 px-4 rounded-md font-medium ${
          isInCart(course.id)
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white'
        }`}
        onClick={() => !isInCart(course.id) && handleAddToCart(course)}
        disabled={isInCart(course.id)}
      >
        {isInCart(course.id) ? 'Added to cart' : 'Add to cart'}
      </button>
    </div>
  )

  // Cart Popup Component
  const CartPopup = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-xl">Added to cart</h3>
          <button 
            onClick={handleCloseCartPopup}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {addedCourse && (
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <h4 className="font-medium text-sm line-clamp-2">{addedCourse.title}</h4>
                    <div className="text-xs text-gray-500">
                      {addedCourse.instructor.split(',')[0]}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleGoToCart}
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white text-sm py-2 px-4 rounded-md"
              >
                Go to cart
              </button>
            </div>
          </div>
        )}
        
        <div className="p-4">
          <h4 className="font-bold text-lg mb-4">Frequently Bought Together</h4>
          
          <div className="space-y-4">
            {recommendedCourses.map((course, index) => (
              <div key={course.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-2">
                  {index === 0 ? (
                    <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded-full flex items-center justify-center w-6 h-6">
                      <span className="text-white font-bold text-sm">JS</span>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded-full flex items-center justify-center w-6 h-6">
                      <span className="text-white font-bold text-sm">
                        {course.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-sm line-clamp-1">{course.title}</h5>
                      <div className="flex items-center text-xs text-gray-700">
                        <span>{course.instructor.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-xs font-medium">{course.rating}</span>
                        </div>
                        <span className="mx-1 text-gray-400 text-xs">
                          ({(course.students).toLocaleString()})
                        </span>
                        {course.tag === 'Bestseller' && (
                          <span className="text-xs font-medium ml-1 py-0.5 px-1 bg-yellow-100 text-yellow-800 rounded">
                            Bestseller
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold">${course.discountPrice.toFixed(2)}</div>
                      <button 
                        className="mt-1"
                        onClick={() => {
                          if (!isInCart(course.id)) {
                            addToCart({
                              ...course,
                              originalPrice: course.originalPrice || course.price * 1.7
                            })
                          }
                        }}
                        disabled={isInCart(course.id)}
                      >
                        {isInCart(course.id) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Plus className="w-4 h-4 text-orange-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total:</div>
              <div className="font-bold text-xl">${totalPrice.toFixed(2)}</div>
            </div>
            
            <button
              onClick={handleAddAllToCart}
              className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white py-2 px-4 rounded-md"
            >
              Add all to cart
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-b-lg border-t">
          <h4 className="font-medium text-sm mb-2">Related topics</h4>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((topic, index) => (
              <span 
                key={index}
                className="text-xs py-1 px-3 border border-gray-300 rounded-full bg-white hover:bg-gray-50 cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="container max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Explore Courses</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
                  <Filter size={18} className="text-gray-500" />
                </div>
                
                {/* Search input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              
              {/* Topics filter */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setTopicsOpen(!topicsOpen)} 
                  className="py-4 px-5 text-sm font-medium w-full text-left flex justify-between items-center text-gray-900 hover:bg-gray-50"
                >
                  Topics
                  <ChevronDown size={16} className={`transition-transform ${topicsOpen ? 'rotate-180' : ''}`} />
                </button>
                {topicsOpen && (
                  <div className="py-2 px-5">
                    <div className="max-h-56 overflow-y-auto space-y-2">
                      {ALL_TOPICS.map((topic) => (
                        <div key={topic} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`topic-${topic}`}
                            className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4 cursor-pointer"
                            checked={selectedTopics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                          />
                          <label htmlFor={`topic-${topic}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {topic}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Level filter */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setLevelsOpen(!levelsOpen)} 
                  className="py-4 px-5 text-sm font-medium w-full text-left flex justify-between items-center text-gray-900 hover:bg-gray-50"
                >
                  Level
                  <ChevronDown size={16} className={`transition-transform ${levelsOpen ? 'rotate-180' : ''}`} />
                </button>
                {levelsOpen && (
                  <div className="py-2 px-5">
                    <div className="space-y-2">
                      {ALL_LEVELS.map((level) => (
                        <div key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`level-${level}`}
                            className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4 cursor-pointer"
                            checked={selectedLevels.includes(level)}
                            onChange={() => toggleLevel(level)}
                          />
                          <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Duration filter */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setDurationOpen(!durationOpen)} 
                  className="py-4 px-5 text-sm font-medium w-full text-left flex justify-between items-center text-gray-900 hover:bg-gray-50"
                >
                  Duration
                  <ChevronDown size={16} className={`transition-transform ${durationOpen ? 'rotate-180' : ''}`} />
                </button>
                {durationOpen && (
                  <div className="py-4 px-5">
                    <div className="flex justify-between mb-2 text-sm text-gray-500">
                      <span>{durationRange[0]} hours</span>
                      <span>{durationRange[1]} hours</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="70"
                      value={durationRange[1]}
                      onChange={(e) => setDurationRange([durationRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Course listings */}
          <div className="w-full lg:w-3/4">
            {/* Sort controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-500">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              </div>
            </div>
            
            {/* Course grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
                    onMouseEnter={(e) => handleMouseEnter(course, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link href={`/courses/${course.id}`} className="cursor-pointer">
                      <div className="h-40 bg-gray-200 relative">
                        {/* Course image placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded w-full h-full opacity-30"></div>
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                            {course.topics[0]}
                          </div>
                        </div>
                        
                        {/* Course tag */}
                        {course.tag && (
                          <div className="absolute top-2 left-2">
                            <span className={`text-xs font-medium py-1 px-2 rounded-sm ${course.tag === 'Bestseller' ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-500 text-white'}`}>
                              {course.tag}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex-grow">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 font-medium text-gray-900">{course.rating}</span>
                          </div>
                          <span className="mx-1 text-gray-400 text-xs">
                            ({(course.reviews).toLocaleString()})
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{course.duration}</span>
                          <span className="mx-2">•</span>
                          <span>{course.level}</span>
                        </div>
                        
                        <div className="flex items-center mt-auto">
                          <span className="font-bold text-lg text-gray-900">${course.discountPrice}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">${course.originalPrice}</span>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-4 border-t">
                      <button
                        className={`w-full py-2 px-4 rounded-md font-medium ${
                          isInCart(course.id)
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white'
                        }`}
                        onClick={() => !isInCart(course.id) && handleAddToCart(course)}
                        disabled={isInCart(course.id)}
                      >
                        {isInCart(course.id) ? 'Added to cart' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <Search className="w-12 h-12 text-gray-300 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedTopics([])
                      setSelectedLevels([])
                      setDurationRange([0, 70])
                    }}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
            
            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-8 h-8 rounded-md ${
                      currentPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {renderPaginationNumbers()}
                  
                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-8 h-8 rounded-md ${
                      currentPage === totalPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Course Detail Popup */}
      {hoveredCourse && <CourseDetailPopup course={hoveredCourse} />}
      
      {/* Cart Popup */}
      {showCartPopup && <CartPopup />}
    </div>
  )
}

// Mock Cart Context for the example
interface CartItem {
  id: string;
  title: string;
  price: number;
  discountPrice: number;
  originalPrice: number;
}

const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([])
  
  const addToCart = (course: CartItem) => {
    setItems((prevItems) => {
      if (prevItems.some(item => item.id === course.id)) {
        return prevItems
      }
      return [...prevItems, course]
    })
  }
  
  const isInCart = (courseId: any) => {
    return items.some(item => item.id === courseId)
  }
  
  const totalItems = items.length
  
  return { items, addToCart, isInCart, totalItems }
}