import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LessonPage from "./components/LessonPage";
import { reactCourse } from "./data/course";
import { useProgress } from "./hooks/useProgress";
import {
  buildFlatTopics,
  findTopicBySlug,
  getTopicPath,
} from "./utils/courseNavigation";
import "./App.css";

function CourseApp() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [sidebarQuery, setSidebarQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(() => new Set([0]));
  const activeChipRef = useRef<HTMLButtonElement | null>(null);

  const flatTopics = useMemo(() => buildFlatTopics(reactCourse), []);
  const activeRef = slug ? findTopicBySlug(reactCourse, slug) : flatTopics[0];

  const activeCategoryIndex = activeRef?.categoryIndex ?? 0;
  const activeGroupIndex = activeRef?.groupIndex ?? 0;
  const activeTopicIndex = activeRef?.topicIndex ?? 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    activeChipRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [slug]);

  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryIndex)) next.delete(categoryIndex);
      else next.add(categoryIndex);
      return next;
    });
  };

  const activeCategory = reactCourse.categories[activeCategoryIndex];
  const activeGroup = activeCategory?.groups[activeGroupIndex];
  const activeTopic = activeGroup?.topics[activeTopicIndex];
  const activeProjects = activeTopic ? (reactCourse.projectsByTopicId[activeTopic.id] ?? []) : [];

  const activeGlobalIndex = activeRef
    ? flatTopics.findIndex(
        (item) =>
          item.categoryIndex === activeRef.categoryIndex &&
          item.groupIndex === activeRef.groupIndex &&
          item.topicIndex === activeRef.topicIndex,
      )
    : 0;

  const totalTopics = flatTopics.length;
  const { progress, setLastSlug, isLessonComplete } = useProgress();
  const completedCount = progress.completedTopicIds.length;

  const continueSlug = useMemo(() => {
    if (progress.lastSlug) {
      const last = findTopicBySlug(reactCourse, progress.lastSlug);
      if (last && !progress.completedTopicIds.includes(last.topicId)) {
        return progress.lastSlug;
      }
    }
    for (const item of flatTopics) {
      if (!progress.completedTopicIds.includes(item.topicId)) return item.slug;
    }
    return flatTopics[0]?.slug;
  }, [progress.lastSlug, progress.completedTopicIds, flatTopics]);

  useEffect(() => {
    if (slug) setLastSlug(slug);
  }, [slug, setLastSlug]);

  useEffect(() => {
    if (slug && slug !== "react-home") {
      localStorage.setItem("react-edu-hero-seen", "1");
    }
  }, [slug]);

  const showHero =
    slug === "react-home" ||
    (typeof window !== "undefined" && localStorage.getItem("react-edu-hero-seen") !== "1");

  const sidebarFilter = sidebarQuery.trim().toLowerCase();

  const expandedWithActive = useMemo(() => {
    const next = new Set(expandedCategories);
    next.add(activeCategoryIndex);
    return next;
  }, [expandedCategories, activeCategoryIndex]);

  if (!activeTopic || !activeCategory || !activeGroup) {
    return <Navigate to={getTopicPath(flatTopics[0]?.slug ?? "react-home")} replace />;
  }

  const goToTopic = (globalIndex: number) => {
    const target = flatTopics[globalIndex];
    if (target) {
      setExpandedCategories((prev) => new Set([...prev, target.categoryIndex]));
      navigate(getTopicPath(target.slug));
    }
  };

  return (
    <div className="page">
      <Header title={reactCourse.title} />
      <main>
        {showHero && <Hero subtitle={reactCourse.subtitle} />}

        <section className="container app-layout">
          <button
            type="button"
            className="sidebar-mobile-toggle"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? "Menüyü kapat" : "Konu menüsü"}
          </button>
          {mobileNavOpen && (
            <button
              type="button"
              className="sidebar-backdrop"
              aria-label="Menüyü kapat"
              onClick={() => setMobileNavOpen(false)}
            />
          )}
          <aside
            className={mobileNavOpen ? "sidebar-fixed sidebar-drawer-open" : "sidebar-fixed"}
            aria-label="React konu navigasyonu"
          >
            <h3 className="sidebar-title">{activeCategory.title}</h3>
            <p className="sidebar-progress">
              Tamamlanan: {completedCount}/{totalTopics}
            </p>
            <div className="progress-track sidebar-progress-bar" aria-hidden>
              <div
                className="progress-fill"
                style={{ width: `${(completedCount / totalTopics) * 100}%` }}
              />
            </div>
            {continueSlug && (
              <button
                type="button"
                className="continue-learning-btn"
                onClick={() => navigate(getTopicPath(continueSlug))}
              >
                Devam et
              </button>
            )}
            <label className="sidebar-search-label">
              <span className="visually-hidden">Konu ara</span>
              <input
                type="search"
                className="sidebar-search"
                placeholder="Konu ara…"
                value={sidebarQuery}
                onChange={(e) => setSidebarQuery(e.target.value)}
              />
            </label>
            <div className="sidebar-nav">
              {reactCourse.categories.map((category, categoryIndex) => {
                const isExpanded = expandedWithActive.has(categoryIndex);
                return (
                  <div key={category.id} className="category-nav-block">
                    <button
                      type="button"
                      className={
                        activeCategoryIndex === categoryIndex
                          ? "category-tab active"
                          : "category-tab"
                      }
                      aria-expanded={isExpanded}
                      onClick={() => toggleCategory(categoryIndex)}
                    >
                      <span className="category-tab-label">{category.title}</span>
                      <span className="category-chevron" aria-hidden>
                        {isExpanded ? "▾" : "▸"}
                      </span>
                    </button>
                    {isExpanded &&
                      category.groups.map((group) => (
                        <div key={group.id} className="menu-section-list">
                          {group.topics
                            .filter((topic) => {
                              if (!sidebarFilter) return true;
                              return (
                                topic.title.toLowerCase().includes(sidebarFilter) ||
                                topic.slug.toLowerCase().includes(sidebarFilter)
                              );
                            })
                            .map((topic) => {
                            const isActive = topic.slug === slug;
                            const done =
                              progress.completedTopicIds.includes(topic.id) ||
                              isLessonComplete(topic);
                            return (
                              <button
                                key={topic.id}
                                type="button"
                                ref={isActive ? activeChipRef : undefined}
                                className={
                                  isActive
                                    ? "topic-chip active"
                                    : done
                                      ? "topic-chip topic-chip-done"
                                      : "topic-chip"
                                }
                                onClick={() => {
                                  setMobileNavOpen(false);
                                  navigate(getTopicPath(topic.slug));
                                }}
                              >
                                {done && <span className="topic-done-mark" aria-hidden>✓</span>}
                                {topic.title}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="content-flow">
            <LessonPage
              lesson={activeTopic}
              categoryTitle={activeCategory.title}
              groupTitle={activeGroup.title}
              projects={activeProjects}
              onPrevious={() => goToTopic(activeGlobalIndex - 1)}
              onNext={() => goToTopic(activeGlobalIndex + 1)}
              hasPrevious={activeGlobalIndex > 0}
              hasNext={activeGlobalIndex < totalTopics - 1}
              progressLabel={`Ders ${activeGlobalIndex + 1} / ${totalTopics}`}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const flatTopics = useMemo(() => buildFlatTopics(reactCourse), []);
  const defaultSlug = flatTopics[0]?.slug ?? "react-home";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={getTopicPath(defaultSlug)} replace />} />
        <Route path="/react/:slug" element={<CourseApp />} />
        <Route path="*" element={<Navigate to={getTopicPath(defaultSlug)} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
