

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ArrowDownCircleIcon } from 'lucide-react';
import { useState } from 'react';

const faq = [
    { question: 'Nursery', answer: 'You can return unused items...' },
    { question: 'K2', answer: 'We accept Visa, MasterCard...' },
    { question: 'K3', answer: 'Please contact our support...' },
    { question: 'K4', answer: 'You can return unused items...' },
    { question: 'K5', answer: 'We accept Visa, MasterCard...' },
    { question: 'K6', answer: 'Please contact our support...' },
    { question: 'K7', answer: 'Please contact our support...' },
    { question: 'K8', answer: 'You can return unused items...' },
    { question: 'K9', answer: 'We accept Visa, MasterCard...' },
    { question: 'K10', answer: 'Please contact our support...' },
];

const MySubject = () => {
    const [leftAccordionValue, setLeftAccordionValue] = useState<string>();
    const [rightAccordionValue, setRightAccordionValue] = useState<string>();

    const renderItems = (items: typeof faq, offset: number = 0) =>
        items.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index + offset}`} className="mt-4 rounded-2xl border-b-0 bg-[#3a573a]">
                <AccordionPrimitive.Header className="flex gap-4">
                    <AccordionPrimitive.Trigger
                        className={cn(
                            'flex flex-1 items-center justify-between p-6 text-lg font-semibold text-white transition-all hover:underline',
                            '[&[data-state=open]>svg]:rotate-45',
                        )}
                    >
                        {question}
                        <ArrowDownCircleIcon className="h-5 w-5 shrink-0 text-white transition-transform duration-200" />
                    </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="grid grid-cols-2 rounded-b-2xl border-t-2 border-white p-4 text-xl text-white">
                    <p>1, English</p>
                    <p>2, Math</p>
                    <p>3, Science</p>
                    <p>4, Library</p>
                    <p>5, Arts & Crafts</p>
                    <p>6, Song & Dance</p>
                    <p>7, Healthy Habits</p>
                    <p>8, Physical Education</p>
                </AccordionContent>
            </AccordionItem>
        ));

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-screen-xl">
                <h2 className="text-center text-4xl !leading-[1.15] text-blue-900 tracking-tight md:text-5xl">Subjects</h2>
                <div className="mt-6 grid w-full gap-x-10 md:grid-cols-2">
                    <Accordion type="single" collapsible value={leftAccordionValue} onValueChange={setLeftAccordionValue} className="w-full">
                        {renderItems(faq.slice(0, 5), 0)}
                    </Accordion>

                    <Accordion type="single" collapsible value={rightAccordionValue} onValueChange={setRightAccordionValue} className="w-full">
                        {renderItems(faq.slice(5), 5)}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default MySubject;
