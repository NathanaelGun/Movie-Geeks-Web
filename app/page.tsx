import Hero from "@/Components/Hero";
import CardButton from "@/Components/CardButtons";

export default function Home() {
  return (
    <main>
      <Hero
        title="Welcome to MovGeek"
        subtitle="Your hub for everything movies 🎬"
      />
      <div className='flex items-center justify-center min-h-screen bg-[#FFFFFF] text-white'>
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20'>
              <CardButton bgColor="bg-red-500" href='movies'>
                  Movies
              </CardButton>

              <CardButton bgColor="bg-blue-500" href='mylist'>
                  MyList
              </CardButton>
              
              <CardButton bgColor="bg-green-500" href='profile'>
                  Profile
              </CardButton>
          </section>
      </div>
    </main>
  );
}
