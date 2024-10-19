import React, { useState } from 'react';

const BlogGeneratorForm = () => {
    const [contentInput, setContentInput] = useState('');
    const [blogType, setBlogType] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [knowledgeLevel, setKnowledgeLevel] = useState('');
    const [readerGoals, setReaderGoals] = useState('');
    const [voice, setVoice] = useState('');
    const [writingStyle, setWritingStyle] = useState({
        conversationalFlow: false,
        mixedSentences: false,
        personalInsights: false
    });
    const [humanElements, setHumanElements] = useState({
        personalStories: false,
        challenges: false,
        lessonsLearned: false,
        humor: false
    });
    const [blogStructure, setBlogStructure] = useState({
        openingHook: '',
        body: '',
        closing: ''
    });
    const [seoKeywords, setSeoKeywords] = useState({
        primaryKeyword: '',
        secondaryKeywords: ''
    });
    const [engagementOptions, setEngagementOptions] = useState({
        readability: false,
        rhetoricalQuestions: false,
        popCulture: false,
        analogies: false
    });

    const handleSubmit = () => {
        const blogData = {
            contentInput,
            blogType,
            targetAudience,
            knowledgeLevel,
            readerGoals,
            voice,
            writingStyle,
            humanElements,
            blogStructure,
            seoKeywords,
            engagementOptions
        };
        console.log(blogData);
        // Perform the blog generation logic with the collected data
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6">
            <h1 className="text-2xl font-bold mb-4">Human-First Blog Generator</h1>

            <div className="space-y-4">
                <label className="block">
                    <span className="font-semibold">1. Content Input (Transcript/Notes):</span>
                    <textarea
                        value={contentInput}
                        onChange={(e) => setContentInput(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                        rows="4"
                        placeholder="Write your rough notes or transcript here..."
                    />
                </label>

                <label className="block">
                    <span className="font-semibold">2. Blog Type:</span>
                    <select
                        value={blogType}
                        onChange={(e) => setBlogType(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    >
                        <option value="">Select blog type</option>
                        <option value="Technical Tutorial/Guide">Technical Tutorial/Guide</option>
                        <option value="Personal Story/Experience">Personal Story/Experience</option>
                        <option value="Industry Analysis/Trends">Industry Analysis/Trends</option>
                        <option value="How-To/Instructional">How-To/Instructional</option>
                        <option value="Opinion/Editorial">Opinion/Editorial</option>
                        <option value="Product Review">Product Review</option>
                        <option value="Case Study">Case Study</option>
                        <option value="News Analysis">News Analysis</option>
                        <option value="Research Summary">Research Summary</option>
                        <option value="Lifestyle/Personal Development">Lifestyle/Personal Development</option>
                    </select>
                </label>

                <label className="block">
                    <span className="font-semibold">3. Audience Profile:</span>
                    <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Who is the target audience?"
                    />
                    <div className="mt-2 flex space-x-4">
                        <label>
                            <input
                                type="radio"
                                value="Beginner"
                                checked={knowledgeLevel === 'Beginner'}
                                onChange={(e) => setKnowledgeLevel(e.target.value)}
                            />{' '}
                            Beginner
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Intermediate"
                                checked={knowledgeLevel === 'Intermediate'}
                                onChange={(e) => setKnowledgeLevel(e.target.value)}
                            />{' '}
                            Intermediate
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Advanced"
                                checked={knowledgeLevel === 'Advanced'}
                                onChange={(e) => setKnowledgeLevel(e.target.value)}
                            />{' '}
                            Advanced
                        </label>
                    </div>
                    <textarea
                        value={readerGoals}
                        onChange={(e) => setReaderGoals(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                        rows="2"
                        placeholder="What should the reader gain from this blog?"
                    />
                </label>

                <label className="block">
                    <span className="font-semibold">4. Voice & Tone:</span>
                    <select
                        value={voice}
                        onChange={(e) => setVoice(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    >
                        <option value="">Select voice & tone</option>
                        <option value="Casual & Friendly">Casual & Friendly</option>
                        <option value="Professional but Warm">Professional but Warm</option>
                        <option value="Expert & Engaging">Expert & Engaging</option>
                        <option value="Story-driven">Story-driven</option>
                        <option value="Analytical but Accessible">Analytical but Accessible</option>
                    </select>
                </label>

                <div className="space-y-2">
                    <span className="font-semibold">5. Writing Style:</span>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={writingStyle.conversationalFlow}
                            onChange={() =>
                                setWritingStyle({
                                    ...writingStyle,
                                    conversationalFlow: !writingStyle.conversationalFlow
                                })
                            }
                        />{' '}
                        Conversational flow
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={writingStyle.mixedSentences}
                            onChange={() =>
                                setWritingStyle({
                                    ...writingStyle,
                                    mixedSentences: !writingStyle.mixedSentences
                                })
                            }
                        />{' '}
                        Mixed sentences
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={writingStyle.personalInsights}
                            onChange={() =>
                                setWritingStyle({
                                    ...writingStyle,
                                    personalInsights: !writingStyle.personalInsights
                                })
                            }
                        />{' '}
                        Personal insights and real examples
                    </label>
                </div>

                <div className="space-y-2">
                    <span className="font-semibold">6. Human Elements:</span>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={humanElements.personalStories}
                            onChange={() =>
                                setHumanElements({
                                    ...humanElements,
                                    personalStories: !humanElements.personalStories
                                })
                            }
                        />{' '}
                        Personal stories/experiences
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={humanElements.challenges}
                            onChange={() =>
                                setHumanElements({
                                    ...humanElements,
                                    challenges: !humanElements.challenges
                                })
                            }
                        />{' '}
                        Honest challenges/failures
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={humanElements.lessonsLearned}
                            onChange={() =>
                                setHumanElements({
                                    ...humanElements,
                                    lessonsLearned: !humanElements.lessonsLearned
                                })
                            }
                        />{' '}
                        Lessons learned
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={humanElements.humor}
                            onChange={() =>
                                setHumanElements({
                                    ...humanElements,
                                    humor: !humanElements.humor
                                })
                            }
                        />{' '}
                        Natural humor
                    </label>
                </div>

                <label className="block">
                    <span className="font-semibold">7. Blog Structure:</span>
                    <textarea
                        value={blogStructure.openingHook}
                        onChange={(e) =>
                            setBlogStructure({ ...blogStructure, openingHook: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-2"
                        rows="2"
                        placeholder="Opening Hook"
                    />
                    <textarea
                        value={blogStructure.body}
                        onChange={(e) =>
                            setBlogStructure({ ...blogStructure, body: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-2"
                        rows="4"
                        placeholder="Body"
                    />
                    <textarea
                        value={blogStructure.closing}
                        onChange={(e) =>
                            setBlogStructure({ ...blogStructure, closing: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-2"
                        rows="2"
                        placeholder="Closing"
                    />
                </label>

                <label className="block">
                    <span className="font-semibold">8. SEO Optimization:</span>
                    <input
                        type="text"
                        value={seoKeywords.primaryKeyword}
                        onChange={(e) =>
                            setSeoKeywords({ ...seoKeywords, primaryKeyword: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Primary Keyword"
                    />
                    <input
                        type="text"
                        value={seoKeywords.secondaryKeywords}
                        onChange={(e) =>
                            setSeoKeywords({ ...seoKeywords, secondaryKeywords: e.target.value })
                        }
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Secondary Keywords"
                    />
                </label>

                <div className="space-y-2">
                    <span className="font-semibold">9. Additional Formatting & Engagement:</span>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={engagementOptions.readability}
                            onChange={() =>
                                setEngagementOptions({
                                    ...engagementOptions,
                                    readability: !engagementOptions.readability
                                })
                            }
                        />{' '}
                        Formatting for readability (short paragraphs, bullet points, subheadings)
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={engagementOptions.rhetoricalQuestions}
                            onChange={() =>
                                setEngagementOptions({
                                    ...engagementOptions,
                                    rhetoricalQuestions: !engagementOptions.rhetoricalQuestions
                                })
                            }
                        />{' '}
                        Rhetorical questions
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={engagementOptions.popCulture}
                            onChange={() =>
                                setEngagementOptions({
                                    ...engagementOptions,
                                    popCulture: !engagementOptions.popCulture
                                })
                            }
                        />{' '}
                        Pop culture references
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            checked={engagementOptions.analogies}
                            onChange={() =>
                                setEngagementOptions({
                                    ...engagementOptions,
                                    analogies: !engagementOptions.analogies
                                })
                            }
                        />{' '}
                        Analogies
                    </label>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Generate Blog
                </button>
            </div>
        </div>
    );
};

export default BlogGeneratorForm;
