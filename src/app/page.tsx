import { About, AiWorkflow, Contact, Experience, Projects, Stack } from "@/components/Content";
import { Hero } from "@/components/Hero";
import { StatusBar } from "@/components/StatusBar";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <main className="mx-auto w-full max-w-[46rem] px-5 pb-24 sm:px-8">
        <Hero />
        <About />
        <Stack />
        <AiWorkflow />
        <Experience />
        <Projects projects={projects} />
        <Contact />
      </main>
      <StatusBar />
    </>
  );
}
