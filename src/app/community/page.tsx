// src/pages/community/index.tsx

"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, Filter, MessageCircle, Users, Bell, BookOpen, Award, ChevronDown, ThumbsUp, Share2, MoreHorizontal } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

// Types
interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  lastActive: string;
}

interface CommunityPageProps {
  initialPosts: Post[];
  categories: Category[];
  trendingTopics: string[];
  featuredMembers: Member[];
}

function CommunityPageContent({ 
  initialPosts, 
  categories, 
  trendingTopics, 
  featuredMembers 
}: CommunityPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  
  // Filter posts based on active tab and search query
  useEffect(() => {
    let filteredPosts = initialPosts;
    
    if (activeTab !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category.toLowerCase() === activeTab);
    }
    
    if (searchQuery.trim() !== '') {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setPosts(filteredPosts);
  }, [activeTab, searchQuery, initialPosts]);

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  return (
    <>
      <Head>
        <title>Community | E-Learning Platform</title>
        <meta name="description" content="Connect with fellow learners, share insights, and grow together" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Community</h1>
                <p className="mt-1 text-gray-600">Connect, learn, and grow with fellow students</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Link href="/community/new-post" passHref>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    New Post
                  </button>
                </Link>
                <Link href="/community/events" passHref>
                  <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Events
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button 
                        onClick={() => setActiveTab(category.id === 'all' ? 'all' : category.name.toLowerCase())}
                        className={`w-full text-left flex items-center justify-between py-2 px-3 rounded-md ${
                          activeTab === (category.id === 'all' ? 'all' : category.name.toLowerCase()) 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic, index) => (
                    <Link 
                      key={index} 
                      href={`/community/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1"
                    >
                      #{topic}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Active Members</h3>
                  <Link href="/community/members" className="text-sm text-blue-600 hover:text-blue-800">
                    View all
                  </Link>
                </div>
                <ul className="space-y-4">
                  {featuredMembers.slice(0, 5).map(member => (
                    <li key={member.id} className="flex items-center space-x-3">
                      <Image 
                        src={member.avatarUrl} 
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Filters */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="md:hidden">
                      <button 
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center text-gray-700"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-2">
                      <span className="text-gray-500">Sort by:</span>
                      <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="recent">Most Recent</option>
                        <option value="popular">Most Popular</option>
                        <option value="active">Most Active</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Mobile filters */}
                {showMobileFilters && (
                  <div className="mt-4 md:hidden">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Categories</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                          <option value="all">All Categories</option>
                          {categories.filter(cat => cat.id !== 'all').map(category => (
                            <option key={category.id} value={category.name.toLowerCase()}>
                              {category.name} ({category.count})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Sort by</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                          <option value="recent">Most Recent</option>
                          <option value="popular">Most Popular</option>
                          <option value="active">Most Active</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 min-w-0 text-center py-4 px-4 font-medium text-sm ${
                      activeTab === 'all'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    All Discussions
                  </button>
                  <button
                    onClick={() => setActiveTab('questions')}
                    className={`flex-1 min-w-0 text-center py-4 px-4 font-medium text-sm ${
                      activeTab === 'questions'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Questions
                  </button>
                  <button
                    onClick={() => setActiveTab('discussions')}
                    className={`flex-1 min-w-0 text-center py-4 px-4 font-medium text-sm ${
                      activeTab === 'discussions'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Discussions
                  </button>
                  <button
                    onClick={() => setActiveTab('announcements')}
                    className={`flex-1 min-w-0 text-center py-4 px-4 font-medium text-sm ${
                      activeTab === 'announcements'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Announcements
                  </button>
                </div>
              </div>

              {/* Posts List */}
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                            {post.author.role === 'Instructor' && (
                              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                Instructor
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Posted in <Link href={`/community/category/${post.category.toLowerCase()}`} className="text-blue-600 hover:underline">{post.category}</Link> • {post.createdAt}
                          </p>
                        </div>
                      </div>
                      <Link href={`/community/post/${post.id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Link
                            key={index}
                            href={`/community/tag/${tag.toLowerCase()}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-full px-2.5 py-1"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex space-x-4">
                          <button 
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center space-x-1 ${
                              post.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                            }`}
                          >
                            <ThumbsUp className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <Link
                            href={`/community/post/${post.id}#comments`}
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span>{post.comments}</span>
                          </Link>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                          </button>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No discussions found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                  <button 
                    onClick={() => {
                      setActiveTab('all');
                      setSearchQuery('');
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all discussions
                  </button>
                </div>
              )}

              {/* Pagination */}
              {posts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded-md bg-blue-600 text-white">1</button>
                    <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <span className="text-gray-500">...</span>
                    <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                      8
                    </button>
                    <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>

            {/* Right Sidebar - Activity Feed */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  <Link href="/community/activity" className="text-sm text-blue-600 hover:text-blue-800">
                    View all
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://api.placeholder.com/32"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">Sarah Chen</span> replied to{" "}
                        <Link href="/community/post/1" className="text-blue-600 hover:underline">
                          How to optimize React performance?
                        </Link>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://api.placeholder.com/32"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">Marcus Johnson</span> started a new discussion{" "}
                        <Link href="/community/post/2" className="text-blue-600 hover:underline">
                          Tailwind CSS vs. Bootstrap in 2025
                        </Link>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">45 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://api.placeholder.com/32"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">Priya Sharma</span> earned the{" "}
                        <span className="font-medium">Top Contributor</span> badge
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">New Event:</span>{" "}
                        <Link href="/community/events/3" className="text-blue-600 hover:underline">
                          Web Development Office Hours
                        </Link>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Tomorrow at 3:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Community Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-center text-blue-600 mb-2">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-center text-2xl font-bold text-gray-900">1,245</p>
                      <p className="text-center text-sm text-gray-600">Members</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-center text-green-600 mb-2">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <p className="text-center text-2xl font-bold text-gray-900">3,876</p>
                      <p className="text-center text-sm text-gray-600">Discussions</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-center text-purple-600 mb-2">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <p className="text-center text-2xl font-bold text-gray-900">87</p>
                      <p className="text-center text-sm text-gray-600">Courses</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-center text-yellow-600 mb-2">
                        <Award className="w-6 h-6" />
                      </div>
                      <p className="text-center text-2xl font-bold text-gray-900">42</p>
                      <p className="text-center text-sm text-gray-600">Achievements</p>
                      </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Mock data
const getMockData = () => {
  // In a real application, you would fetch this data from your API or database
  const initialPosts: Post[] = [
    {
      id: '1',
      title: 'How to optimize React performance?',
      content: 'I\'ve been working on a large React application and noticed some performance issues when rendering large lists. I\'ve tried using React.memo for components and useCallback for functions, but still experiencing lag. Any suggestions on how to further optimize performance?',
      author: {
        id: 'user1',
        name: 'Sarah Chen',
        avatarUrl: 'https://api.placeholder.com/48',
        role: 'Developer',
      },
      category: 'Questions',
      tags: ['React', 'Performance', 'JavaScript'],
      createdAt: '2 hours ago',
      likes: 12,
      comments: 5,
      isLiked: false,
    },
    {
      id: '2',
      title: 'Tailwind CSS vs. Bootstrap in 2025',
      content: 'With the recent updates to both frameworks, I\'m curious about which one people are preferring for new projects in 2025. What are the pros and cons you\'ve experienced with each? Has Tailwind\'s utility-first approach become the standard, or is Bootstrap still relevant for certain types of projects?',
      author: {
        id: 'user2',
        name: 'Marcus Johnson',
        avatarUrl: 'https://api.placeholder.com/48',
        role: 'Designer',
      },
      category: 'Discussions',
      tags: ['CSS', 'Tailwind', 'Bootstrap', 'Frontend'],
      createdAt: '1 day ago',
      likes: 24,
      comments: 18,
      isLiked: true,
    },
    {
      id: '3',
      title: 'Upcoming JavaScript Course: Advanced Patterns',
      content: 'We\'re excited to announce a new course on Advanced JavaScript Patterns launching next month. This course will cover design patterns, state management approaches, performance optimization techniques, and best practices for modern JavaScript applications.',
      author: {
        id: 'admin1',
        name: 'Jessica Lee',
        avatarUrl: 'https://api.placeholder.com/48',
        role: 'Instructor',
      },
      category: 'Announcements',
      tags: ['Course', 'JavaScript', 'Advanced'],
      createdAt: '3 days ago',
      likes: 45,
      comments: 7,
      isLiked: false,
    }
  ];

  const categories: Category[] = [
    { id: 'all', name: 'All Categories', count: 145 },
    { id: 'questions', name: 'Questions', count: 87 },
    { id: 'discussions', name: 'Discussions', count: 34 },
    { id: 'announcements', name: 'Announcements', count: 12 },
    { id: 'resources', name: 'Resources', count: 8 },
    { id: 'events', name: 'Events', count: 4 }
  ];

  const trendingTopics: string[] = [
    'React', 'TypeScript', 'NextJS', 'AI', 'WebDev', 'Career', 'JavaScript', 'Frontend'
  ];

  const featuredMembers: Member[] = [
    {
      id: 'user1',
      name: 'Sarah Chen',
      avatarUrl: 'https://api.placeholder.com/48',
      role: 'Developer',
      lastActive: 'Online now'
    },
    {
      id: 'user2',
      name: 'Marcus Johnson',
      avatarUrl: 'https://api.placeholder.com/48',
      role: 'Designer',
      lastActive: '5m ago'
    },
    {
      id: 'admin1',
      name: 'Jessica Lee',
      avatarUrl: 'https://api.placeholder.com/48',
      role: 'Instructor',
      lastActive: '1h ago'
    },
    {
      id: 'user3',
      name: 'David Wilson',
      avatarUrl: 'https://api.placeholder.com/48',
      role: 'Student',
      lastActive: '2h ago'
    },
    {
      id: 'user4',
      name: 'Priya Sharma',
      avatarUrl: 'https://api.placeholder.com/48',
      role: 'Developer',
      lastActive: '3h ago'
    },
    {
      id: 'user5',
      name: 'Alex Rodriguez',
      avatarUrl: 'https://api.placeholder.com/48',
      role: 'Student',
      lastActive: '1d ago'
    }
  ];

  return {
    initialPosts,
    categories,
    trendingTopics,
    featuredMembers
  };
};

export default function CommunityPage() {
  const { initialPosts, categories, trendingTopics, featuredMembers } = getMockData();
  return <CommunityPageContent 
    initialPosts={initialPosts}
    categories={categories}
    trendingTopics={trendingTopics}
    featuredMembers={featuredMembers}
    />;
  }