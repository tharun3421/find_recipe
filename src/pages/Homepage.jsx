
import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import {  Search } from 'lucide-react'
import { getRandomColor } from '../lib/utils'


const APP_ID=import.meta.env.VITE_APP_ID;
const APP_KEY=import.meta.env.VITE_APP_KEY;

const Homepage = () => {
  const [recipe,setRecipe]=useState([]);
  const [loading,setLoading]=useState(false);
  
  const  fetchRecipes=async(serachQuery)=>{
    setLoading(true)
    setRecipe([])
    try {
      const res=await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${serachQuery}&type=public`)
      const data=await res.json();
      setRecipe(data.hits)
      console.log(data.hits)
    } catch (error) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  }
useEffect(()=>{
  fetchRecipes("chicken")
},[]);

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form >
          <label className='input shadow-md flex items-center gap-2'>
            <Search size={"24"}/>
            <input type='text' className='text-sm md:text-md grow'placeholder='What do you what to cook today?'/>
          </label>
        </form>
        <p className='font-bold text-2xl md:text-4xl mt-4'>
          Recommended Recipes
        </p>
        <p  className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>
          Popular choices
        </p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {!loading && recipe.map(({recipe},index)=> (
          <RecipeCard key={index} recipe={recipe}
          {...getRandomColor()}/>
          ))}


        {loading && [...Array(9)].map((_,index)=>(
          <div className="flex flex-col gap-4 w-full" key={index}>
            <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          </div>
        ))}
          </div>
        </div>
      </div>
  )
}

export default Homepage