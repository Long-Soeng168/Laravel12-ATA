import { BookOpen, Briefcase, GitCommitVerticalIcon, Home, School, School2Icon, University, User, User2Icon, Users } from 'lucide-react';
import SectionHeader from './section-header';

const WhoWeServe = () => {
    const sectors = [
        {
            icon: School,
            title: 'K-12 Schools & Districts',
            desc: 'Engaging solutions to support young learners with modern curricula and resources.',
        },
        { icon: University, title: 'Colleges & Universities', desc: 'Advanced platforms and services tailored for higher education excellence.' },
        { icon: User, title: 'Individual Students & Parents', desc: 'Personalized learning plans and guidance for families and students.' },
        { icon: Home, title: 'Homeschooling Families', desc: 'Flexible, homeschool-friendly resources and curricula for home educators.' },
        { icon: Briefcase, title: 'Corporate Training Departments', desc: 'Professional training tools to upskill workforces effectively.' },
        { icon: Users, title: 'Non-profits & Organizations', desc: 'Collaborative solutions for educational NGOs and community programs.' },
        { icon: BookOpen, title: 'Libraries & Research', desc: 'Comprehensive catalog management and digital archive support.' },
        { icon: GitCommitVerticalIcon, title: 'Government Agencies', desc: 'Scalable educational programs for public institutions.' },
        { icon: School2Icon, title: 'Vocational Training Centers', desc: 'Hands-on training aids and skill-development modules.' },
        { icon: User2Icon, title: 'Adult Learning Programs', desc: 'Lifelong learning pathways with flexible scheduling and content.' },
    ];

    return (
        <section className="bg-background py-16">
            <SectionHeader
                label="Who We Serve"
                title="Partnering with a Diverse Network"
                subtitle="Our comprehensive suite of solutions is thoughtfully designed to empower a wide range of learners and institutions."
            />
            <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2">
                {sectors.map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="bg-primary/10 inline-flex rounded-full p-3">
                                <Icon className="text-true-primary h-6 w-6" aria-hidden="true" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{title}</h3>
                            <p className="text-muted-foreground">{desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default WhoWeServe;
