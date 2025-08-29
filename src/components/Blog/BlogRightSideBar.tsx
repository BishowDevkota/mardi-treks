import React from "react";

const BlogRightSideBar = () => {
  return (
    <aside className="max-h-[calc(100vh-1rem)] bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg sticky top-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-white mb-4">Explore More</h2>
      <div className="space-y-4">
        {/* Recent Posts Section */}
        <div>
          <h3 className="text-md font-semibold text-gray-200 mb-2">Recent Posts</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/blog/mardi-himal-trek-guide"
                className="text-gray-300 hover:text-white hover:underline transition-all duration-300"
              >
                Mardi Himal Trek Guide
              </a>
            </li>
            <li>
              <a
                href="/blog/trekking-tips"
                className="text-gray-300 hover:text-white hover:underline transition-all duration-300"
              >
                Top Trekking Tips
              </a>
            </li>
            <li>
              <a
                href="/blog/nepal-travel"
                className="text-gray-300 hover:text-white hover:underline transition-all duration-300"
              >
                Nepal Travel Essentials
              </a>
            </li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-md font-semibold text-gray-200 mb-2">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/blog/category/trekking"
                className="text-gray-300 hover:text-white hover:underline transition-all duration-300"
              >
                Trekking
              </a>
            </li>
            <li>
              <a
                href="/blog/category/adventure"
                className="text-gray-300 hover:text-white hover:underline transition-all duration-300"
              >
                Adventure
              </a>
            </li>
            <li>
              <a
                href="/blog/category/culture"
                className="text-gray-300 hover:text-white hover:underline transition-all duration-300"
              >
                Culture
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="text-md font-semibold text-gray-200 mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogRightSideBar;