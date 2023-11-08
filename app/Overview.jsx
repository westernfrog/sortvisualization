"use client";

import React, { useState, useEffect } from "react";

export default function Overview() {
  const initialArray = [65, 76, 61, 69, 99, 56, 73, 105, 30, 104];
  const [array, setArray] = useState(initialArray);
  const [bars, setBars] = useState([]);

  useEffect(() => {
    setBars(
      array.map((value, index) => ({
        value,
        id: `bar${index}`,
        bgColor: "bg-emerald-900",
      }))
    );
  }, [array]);

  const handleBubbleSort = async () => {
    for (let i = 0; i < bars.length; i += 1) {
      for (let j = 0; j < bars.length - i - 1; j += 1) {
        setBars((prevBars) =>
          prevBars.map((bar, index) => {
            if (index === j || index === j + 1) {
              return { ...bar, bgColor: "bg-indigo-800" };
            }
            return bar;
          })
        );

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 500)
        );

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          setBars((prevBars) =>
            prevBars.map((bar, index) => {
              if (index === j || index === j + 1) {
                return {
                  ...bar,
                  value: array[index],
                };
              }
              return bar;
            })
          );

          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 500)
          );
        }

        setBars((prevBars) =>
          prevBars.map((bar, index) => {
            if (index === j || index === j + 1) {
              return {
                ...bar,
                bgColor: "bg-rose-800",
              };
            }
            return bar;
          })
        );
      }

      setBars((prevBars) =>
        prevBars.map((bar, index) => {
          if (index === bars.length - i - 1) {
            return { ...bar, bgColor: "bg-green-600" };
          }
          return bar;
        })
      );
    }
  };

  const handleReset = () => {
    setArray(initialArray);
  };

  return (
    <>
      <main className="relative flex items-center justify-center h-screen p-8">
        <div className="absolute lg:top-16 top-8 font-bold text-indigo-950 text-4xl tracking-tight">
          <h1>Bubble Sort</h1>
          <span className="flex items-center justify-center gap-2 my-4">
            <button
              onClick={handleBubbleSort}
              className="ring-1 ring-indigo-950 shadow-inner shadow-indigo-500 rounded-2xl drop-shadow-2xl p-2 active:scale-90 scale-1 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6q"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </button>
            <button
              onClick={handleReset}
              className="ring-1 ring-indigo-950 shadow-inner shadow-indigo-500 rounded-2xl drop-shadow-2xl p-2 active:scale-90 scale-1 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="flex items-end justify-center gap-4">
          {bars.map((bar) => (
            <div
              key={bar.id}
              className={`${bar.bgColor} lg:w-20 ring-4 ring-indigo-950 rounded-2xl drop-shadow-2xl text-slate-300 text-2xl font-semibold tracking-tight text-center p-4 transition duration-300 ease-in-out`}
              style={{
                height: `${bar.value * 2}px`,
              }}
            >
              {bar.value}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
