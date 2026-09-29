import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { EXPERIMENT_CARDS } from "./home/experiments";
import { PROJECT_CARDS } from "./home/data";
import { TECHS } from "../components/tech-sphere/data";
import "../styles/search-page.css";
import "../styles/route-pages.css";

type SearchCategory = "All" | "Projects" | "Tools" | "Experiments" | "Portfolio";

interface SearchResult {
  title: string;
  description: string;
  category: Exclude<SearchCategory, "All">;
  destination: string;
  source: string;
  terms?: string[];
  concepts?: string[];
  external?: boolean;
}

const CATEGORIES: SearchCategory[] = [
  "All",
  "Projects",
  "Tools",
  "Experiments",
  "Portfolio",
];

const SEARCH_INDEX: SearchResult[] = [
  {
    title: "A game developer building playful digital experiences",
    category: "Portfolio",
    destination: "/#about-section",
    source: "WHO IS RED? / ABOUT",
    description:
      "I’m a game developer. I build playful digital experiences where games, stories, and technology meet. Explore my projects, experiments, and the tools I use to make them.",
    terms: ["games", "gameplay", "developer", "about", "portfolio"],
    concepts: ["identity", "role", "work"],
  },
  ...PROJECT_CARDS.map((project) => ({
    title: project.title,
    description: `${project.lines.join(". ")} A game project by a game developer, made for curious players.`,
    category: "Projects" as const,
    destination: project.url,
    source: "ITCH.IO / GAME PROJECT",
    terms: ["games", "gameplay", "play", "projects"],
    concepts: ["projects", "games", "work"],
    external: true,
  })),
  ...TECHS.map((tech) => ({
    title: tech.name,
    description: tech.desc,
    category: "Tools" as const,
    destination: "/#tools-section",
    source: "WHO IS RED? / TOOLS",
    terms: ["game development", "technology", "tools", "creative", "software"],
    concepts: ["tools", "technology"],
  })),
  ...EXPERIMENT_CARDS.map((experiment) => ({
    title: experiment.title,
    description: `${experiment.summary} ${experiment.kind}. ${experiment.categories.join(", ")} experiment.`,
    category: "Experiments" as const,
    destination: "/#experiments-section",
    source: "WHO IS RED? / EXPERIMENTS",
    terms: ["prototype", "creative experiments", "gameplay", "ideas"],
    concepts: ["work", "experiments", "prototypes"],
  })),
  {
    title: "Have an idea? Let’s build something weird.",
    description:
      "Get in touch about a game, a collaboration, a question, or a curious idea you would like to make real.",
    category: "Portfolio",
    destination: "/#contact-section",
    source: "WHO IS RED? / CONTACT",
    terms: ["contact", "hire", "collaborate", "email", "project"],
    concepts: ["contact", "collaboration"],
  },
];

const SUGGESTED_SEARCHES = [
  "Who are you?",
  "What do you do?",
  "What have you made?",
  "What tools do you use?",
];
const SEARCH_STOP_WORDS = new Set([
  "a", "an", "and", "are", "did", "do", "for", "from", "how",
  "i", "in", "is", "it", "me", "my", "of", "on", "or", "the", "to",
  "what", "where", "which", "who", "with", "you", "your", "show", "find",
]);

// Question phrases and result tags share a small local concept-vector space.
const SEMANTIC_VECTORS: Array<{ pattern: RegExp; concepts: string[] }> = [
  {
    pattern: /\bwho (?:are|is) (?:you|this|red|the developer)\b|\bwho (?:made|built|created) (?:this|you)\b|\b(?:tell me about|introduce) yourself\b|\btell me about you\b|\bwhat(?:s| is) your name\b|\babout me\b|\bwhat are you$/,
    concepts: ["identity"],
  },
  {
    pattern: /\bwhat (?:do|can) you do\b|\bwhat can you (?:help with|offer)\b|\bwhat do you (?:make|build|create|work on)\b|\bwhat are you (?:making|building|working on)\b|\bwhat(?:s| is) your (?:job|role)\b|\bwhat kind of work do you do\b|\b(?:your|my) (?:work|profession|career)\b/,
    concepts: ["role", "work"],
  },
  {
    pattern: /\bwhat (?:kind of )?games? do you (?:make|build|create)\b|\bwhat (?:games|projects) (?:have you|did you) (?:made|make|built|build|created|create)\b|\bwhat (?:did you|have you) (?:make|made|build|built|create|created)\b|\bshow me your (?:projects|games|work)\b/,
    concepts: ["projects", "games", "work"],
  },
  {
    pattern: /\bwhat (?:tools?|tech|technology|technologies|software|engines?|programming languages?) (?:do you use|are you using)\b|\bwhat do you use\b|\bwhat(?:s| is) your tech stack\b/,
    concepts: ["tools", "technology"],
  },
  {
    pattern: /\b(?:how can|how do) i (?:contact|hire|reach) you\b|\bhow can i work with you\b|\bcan i collaborate with you\b/,
    concepts: ["contact", "collaboration"],
  },
  {
    pattern: /\b(?:tools?|tech|technology|technologies|software|engines?|programming languages?|tech stack)\b/,
    concepts: ["tools", "technology"],
  },
  {
    pattern: /\b(?:prototypes?|experiments?)\b/,
    concepts: ["experiments", "prototypes"],
  },
  {
    pattern: /\b(?:contact|hire|collaborate|collaboration)\b/,
    concepts: ["contact", "collaboration"],
  },
];

function getSemanticConcepts(query: string): Set<string> {
  return new Set(
    SEMANTIC_VECTORS.flatMap(({ pattern, concepts }) =>
      pattern.test(query) ? concepts : [],
    ),
  );
}

function semanticSimilarity(queryVector: Set<string>, documentVector: string[] = []): number {
  if (queryVector.size === 0 || documentVector.length === 0) return 0;

  const overlap = documentVector.filter((concept) => queryVector.has(concept)).length;
  return overlap / Math.sqrt(queryVector.size * documentVector.length);
}

function findResults(query: string): SearchResult[] {
  const normalizedQuery = query
    .toLocaleLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9#+\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const semanticConcepts = getSemanticConcepts(normalizedQuery);
  const words = normalizedQuery
    .split(/[\s,;]+/)
    .map((word) => word.trim().replace(/^[^a-z0-9#+]+|[^a-z0-9#+]+$/gi, ""))
    .filter((word) => word && !SEARCH_STOP_WORDS.has(word));

  if (words.length === 0 && semanticConcepts.size === 0) return [];

  return SEARCH_INDEX.map((result, index) => {
    const searchableText = [
      result.title,
      result.description,
      result.category,
      ...(result.terms ?? []),
    ]
      .join(" ")
      .toLocaleLowerCase();
    const lexicalMatches = words.filter((word) => {
      const singular = word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;
      return searchableText.includes(word) || searchableText.includes(singular);
    });
    const semanticMatches = (result.concepts ?? []).filter((concept) =>
      semanticConcepts.has(concept),
    );
    const similarity = semanticSimilarity(semanticConcepts, result.concepts);

    const lexicalScore = lexicalMatches.reduce((total, word) => {
      const title = result.title.toLocaleLowerCase();
      const singular = word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;
      return total + (title.includes(word) || title.includes(singular) ? 8 : 4);
    }, 0);
    const score = lexicalScore + Math.round(similarity * 6);
    const matchedWords = lexicalMatches.length + semanticMatches.length;

    return {
      result,
      index,
      matchedWords,
      score: matchedWords === 0 ? -1 : score,
    };
  })
    .filter(({ score }) => score >= 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.matchedWords - left.matchedWords ||
        left.index - right.index,
    )
    .map(({ result }) => result);
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  return <SearchResultsPage key={query} query={query} />;
}

function SearchResultsPage({ query }: { query: string }) {
  const navigate = useNavigate();
  const navigationTimerRef = useRef<number | null>(null);
  const [inputValue, setInputValue] = useState(query);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("All");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(
    () => () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    },
    [],
  );

  const results = useMemo(() => findResults(query), [query]);
  const visibleResults =
    activeCategory === "All"
      ? results
      : results.filter((result) => result.category === activeCategory);

  const navigateToQuery = (normalizedQuery: string) => {
    if (normalizedQuery === query) {
      setActiveCategory("All");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    navigate(
      normalizedQuery
        ? `/search?q=${encodeURIComponent(normalizedQuery)}`
        : "/search",
    );
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSearching) return;

    setIsSearching(true);
    navigationTimerRef.current = window.setTimeout(() => {
      setIsSearching(false);
      navigateToQuery(inputValue.trim());
    }, 200);
  };

  const searchFor = (suggestion: string) => {
    setInputValue(suggestion);
    navigateToQuery(suggestion.trim());
  };

  return (
    <>
      <main className="search-page">
        <header className="search-page-header">
          <div className="search-page-topline">
              <Link to="/" className="route-back-link search-back-link">
                <span aria-hidden="true">←</span> Back to the portfolio
              </Link>
            <p className="search-page-eyebrow geist-pixel-uniquifier">
              PORTFOLIO INDEX <span aria-hidden="true">/</span> 01
            </p>
          </div>
          <div className="search-page-heading">
            <h1 className="visually-hidden">Search the portfolio</h1>
            <p className="search-page-eyebrow search-page-eyebrow-desktop geist-pixel-uniquifier">
              PORTFOLIO INDEX <span aria-hidden="true">/</span> 01
            </p>
            <form
              className={`portfolio-search-form${isSearching ? " is-searching" : ""}`}
              role="search"
              onSubmit={submitSearch}
            >
              <label className="visually-hidden" htmlFor="portfolio-search-input">
                Search the portfolio
              </label>
              <input
                id="portfolio-search-input"
                className="chelsea-market-regular"
                type="search"
                placeholder="Search projects, tools, ideas..."
                autoComplete="off"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                disabled={isSearching}
              />
              <button
                type="submit"
                aria-label={isSearching ? "Searching" : "Search the portfolio"}
                disabled={isSearching}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
              </button>
            </form>
          </div>
        </header>

        <div className="search-page-content">
          <section className="search-results-column" aria-label="Search results">
            {query ? (
              <>
                <p className="search-results-count geist-pixel-uniquifier" role="status">
                  {results.length === 0
                    ? `NO MATCHES FOUND FOR “${query}”`
                    : `${visibleResults.length} ${visibleResults.length === 1 ? "RESULT" : "RESULTS"} FOR “${query}”`}
                </p>

                {results.length > 0 && (
                  <nav className="search-category-tabs" aria-label="Filter results">
                    {CATEGORIES.map((category) => {
                      const categoryCount =
                        category === "All"
                          ? results.length
                          : results.filter((result) => result.category === category).length;

                      return (
                        <button
                          key={category}
                          type="button"
                          aria-pressed={activeCategory === category}
                          onClick={() => setActiveCategory(category)}
                        >
                          {category} <span>{categoryCount}</span>
                        </button>
                      );
                    })}
                  </nav>
                )}

                {visibleResults.length > 0 ? (
                  <ol className="search-result-list">
                    {visibleResults.map((result, index) => (
                      <li className="search-result" key={`${result.category}-${result.title}`}>
                        <span className="search-result-number" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="search-result-body">
                          <p className="search-result-source geist-pixel-uniquifier">
                            {result.source}
                          </p>
                          <h2>
                            {result.external ? (
                                <a href={result.destination} target="_blank" rel="noopener noreferrer">
                                {result.title} <span aria-hidden="true">↗</span>
                              </a>
                            ) : (
                              <Link to={result.destination}>{result.title}</Link>
                            )}
                          </h2>
                          <p className="search-result-description jersey-25-regular">
                            {result.description}
                          </p>
                          <span className="search-result-category">{result.category}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="search-empty-state">
                    <p className="search-empty-stamp rubik-spray-paint-regular" aria-hidden="true">
                      HMM?
                    </p>
                    <h1 className="erica-one-regular">
                      {activeCategory === "All"
                        ? "NOTHING ON THAT TRAIL YET."
                        : `NO ${activeCategory.toUpperCase()} RESULTS YET.`}
                    </h1>
                    <p className="jersey-25-regular">
                      {activeCategory === "All"
                        ? "Try a broader word, or follow one of these trails instead."
                        : `This search has no ${activeCategory.toLowerCase()} matches. Choose another filter or try a broader word.`}
                    </p>
                    <SuggestedSearches onSearch={searchFor} />
                  </div>
                )}
              </>
            ) : (
              <div className="search-welcome">
                <span className="search-welcome-scribble" aria-hidden="true">✳</span>
                <p className="search-page-eyebrow geist-pixel-uniquifier">A LITTLE BIT OF EVERYTHING</p>
                <h1 className="erica-one-regular">WHAT ARE YOU LOOKING FOR?</h1>
                <p className="jersey-25-regular">
                  Search the projects, tools, and curious experiments tucked into this portfolio.
                </p>
                <SuggestedSearches onSearch={searchFor} />
              </div>
            )}
          </section>

          <aside className="search-side-note" aria-label="Search tip">
            <span className="search-side-note-pin" aria-hidden="true" />
            <p className="geist-pixel-uniquifier">FIELD NOTE / 01</p>
            <h2 className="chelsea-market-regular">Follow your curiosity.</h2>
            <p className="jersey-25-regular">
              Ask who I am, what I build, or which tools I use. Search a project name to find another rabbit hole.
            </p>
            <Link to="/" className="search-home-link">
              BACK TO THE PORTFOLIO <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}

function SuggestedSearches({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="search-suggestions" aria-label="Suggested searches">
      {SUGGESTED_SEARCHES.map((suggestion) => (
        <button key={suggestion} type="button" onClick={() => onSearch(suggestion)}>
          {suggestion} <span aria-hidden="true">↗</span>
        </button>
      ))}
    </div>
  );
}
