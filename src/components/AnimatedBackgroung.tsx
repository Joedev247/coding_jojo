// 'use client';
// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';

// export default function AnimatedBackground() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({
//         x: e.clientX / window.innerWidth,
//         y: e.clientY / window.innerHeight,
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       <motion.div
//         className="absolute inset-0"
//         animate={{
//           background: [
//             'radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.15) 0%, rgba(255, 165, 0, 0.05) 50%, transparent 100%)',
//             'radial-gradient(circle at 50% 50%, rgba(255, 165, 0, 0.15) 0%, rgba(255, 107, 107, 0.05) 50%, transparent 100%)',
//           ],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           repeatType: 'reverse',
//           ease: 'linear',
//         }}
//       />
      
//       {/* Interactive gradient following mouse */}
//       <motion.div
//         className="absolute inset-0"
//         animate={{
//           background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
//             mousePosition.y * 100
//           }%, rgba(255, 107, 107, 0.1) 0%, rgba(255, 165, 0, 0.05) 30%, transparent 70%)`,
//         }}
//         transition={{
//           type: 'spring',
//           damping: 30,
//           stiffness: 200,
//         }}
//       />

//       {/* Animated shapes */}
//       {[...Array(3)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full opacity-30"
//           style={{
//             background: 'linear-gradient(45deg, #FF6B6B, #FFA500)',
//             width: `${200 + i * 100}px`,
//             height: `${200 + i * 100}px`,
//           }}
//           animate={{
//             x: [
//               `${-20 + i * 10}%`,
//               `${20 - i * 10}%`,
//               `${-20 + i * 10}%`,
//             ],
//             y: [
//               `${-20 + i * 10}%`,
//               `${20 - i * 10}%`,
//               `${-20 + i * 10}%`,
//             ],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 20 + i * 5,
//             repeat: Infinity,
//             repeatType: 'loop',
//             ease: 'linear',
//           }}
//         />
//       ))}

//       {/* Noise overlay */}
//       <div 
//         className="absolute inset-0 opacity-[0.03]" 
//         style={{ 
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
//         }} 
//       />
//     </div>
//   );
// }
