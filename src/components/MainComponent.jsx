"use client";
import React, { useState } from "react";
import { tabContent, minutes } from '../data/content';
import { getIconForTab } from '../utils/icons';
import { CalendarGrid } from './Calendar/CalendarGrid';
import { ReservationForm } from './Calendar/ReservationForm';

function MainComponent() {
  const [activeTab, setActiveTab] = useState("町内会の意義");
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservations, setReservations] = useState([
    {
      date: "2024-03-20",
      time: "10:00-12:00",
      purpose: "町内会定例会",
      name: "山田太郎",
    },
    {
      date: "2024-03-21",
      time: "14:00-16:00",
      purpose: "高齢者サロン",
      name: "鈴木花子",
    },
  ]);
  const [albumPassword, setAlbumPassword] = useState("");
  const [isAlbumAuthenticated, setIsAlbumAuthenticated] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (albumPassword === "1234") {
      setIsAlbumAuthenticated(true);
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
    }
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    const isTimeSlotTaken = reservations.some(
      (reservation) =>
        reservation.date === selectedDate && reservation.time === selectedTime
    );

    if (isTimeSlotTaken) {
      alert("選択された日時は既に予約されています。別の時間を選択してください。");
      return;
    }

    const newReservation = {
      date: selectedDate,
      time: selectedTime,
      purpose,
      name,
      contact,
    };
    setReservations([...reservations, newReservation]);
    setShowReservationForm(false);
    setSelectedDate("");
    setSelectedTime("");
    setPurpose("");
    setName("");
    setContact("");
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const renderContent = (tab) => {
    if (tab === "お役立ちリンク") {
      return (
        <ul className="list-none grid grid-cols-1 gap-4">
          {tabContent[tab].map((item, index) => (
            <li key={index} className="mb-4">
              {item.component === "reservation" ? (
                <div className="bg-blue-100 p-4 rounded-lg">
                  <button
                    className="flex items-center justify-between w-full cursor-pointer mb-4"
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === "reservation" ? null : "reservation"
                      )
                    }
                  >
                    <h3 className="text-[#4a86e8] font-sans text-lg font-bold">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      公民館予約状況
                    </h3>
                    <i
                      className={`fas fa-chevron-${
                        expandedSection === "reservation" ? "up" : "down"
                      } text-blue-500`}
                    ></i>
                  </button>
                  {expandedSection === "reservation" && (
                    <>
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h4 className="font-bold mb-4 sticky top-0 bg-white py-2">
                          現在の予約状況
                        </h4>
                        <div className="flex justify-between items-center mb-2">
                          <button
                            onClick={handlePrevMonth}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <i className="fas fa-chevron-left"></i>
                          </button>
                          <div className="font-bold text-lg text-blue-600">
                            {currentDate.getFullYear()}年
                            {currentDate.getMonth() + 1}月
                          </div>
                          <button
                            onClick={handleNextMonth}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </div>
                        <CalendarGrid
                          currentDate={currentDate}
                          selectedDate={selectedDate}
                          setSelectedDate={setSelectedDate}
                          reservations={reservations}
                        />
                        {selectedDate && (
                          <>
                            <div className="border-t pt-4 mt-4">
                              <h4 className="font-bold mb-2 text-blue-600">
                                {selectedDate}の予定
                              </h4>
                              {reservations
                                .filter((r) => r.date === selectedDate)
                                .map((reservation, idx) => (
                                  <div
                                    key={idx}
                                    className="mb-4 p-3 bg-blue-50 rounded-lg"
                                  >
                                    <p className="font-bold text-blue-800">
                                      {reservation.time}
                                    </p>
                                    <p className="text-gray-700">
                                      目的: {reservation.purpose}
                                    </p>
                                    <p className="text-gray-700">
                                      予約者: {reservation.name}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      </div>
                      {!showReservationForm ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowReservationForm(true);
                          }}
                          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full text-lg font-bold flex items-center justify-center"
                        >
                          <i className="fas fa-calendar-plus mr-2 text-xl"></i>
                          新規予約を作成
                        </button>
                      ) : (
                        <ReservationForm
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          setSelectedTime={setSelectedTime}
                          purpose={purpose}
                          setPurpose={setPurpose}
                          name={name}
                          setName={setName}
                          contact={contact}
                          setContact={setContact}
                          onSubmit={handleReservationSubmit}
                          onCancel={() => {
                            setShowReservationForm(false);
                            setSelectedDate("");
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === index ? null : index)
                  }
                  className="w-full text-left bg-blue-100 p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#4a86e8] font-sans text-lg font-bold">
                      <i className="fas fa-link mr-2"></i>
                      {item.name}
                    </span>
                    {item.content && (
                      <i
                        className={`fas fa-chevron-${
                          expandedSection === index ? "up" : "down"
                        } text-blue-500`}
                      ></i>
                    )}
                  </div>
                  {expandedSection === index && item.content && (
                    <div className="mt-4 p-4 bg-white rounded-lg text-gray-700">
                      {item.content}
                    </div>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      );
    }

    if (tab === "災害関係") {
      return (
        <ul className="list-none grid grid-cols-1 gap-4">
          {tabContent[tab].map((item, index) => (
            <li key={index} className="mb-4">
              <button
                onClick={() =>
                  setExpandedSection(expandedSection === index ? null : index)
                }
                className="w-full text-left bg-blue-100 p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#4a86e8] font-sans text-lg font-bold">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    {item.name}
                  </span>
                  {item.content && (
                    <i
                      className={`fas fa-chevron-${
                        expandedSection === index ? "up" : "down"
                      } text-blue-500`}
                    ></i>
                  )}
                </div>
                {expandedSection === index && item.content && (
                  <div className="mt-4 p-4 bg-white rounded-lg text-gray-700">
                    {item.content}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      );
    }

    if (tab === "活動履歴") {
      return (
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "activity" ? null : "activity"
              )
            }
            className="bg-blue-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#4a86e8] font-sans text-lg font-bold">
                <i className="fas fa-history mr-2"></i>
                活動報告
              </span>
              <i
                className={`fas fa-chevron-${
                  expandedSection === "activity" ? "up" : "down"
                } text-blue-500`}
              ></i>
            </div>
            {expandedSection === "activity" && (
              <div className="mt-4">
                <div className="h-[400px] overflow-y-auto">
                  {tabContent[tab]
                    .filter((item) => item.type === "活動")
                    .map((item, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border-2 border-blue-300 rounded-lg bg-white"
                      >
                        <h3 className="text-xl font-bold text-blue-600 mb-2">
                          {item.date}
                        </h3>
                        <p className="text-gray-700">{item.content}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </button>
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "circular" ? null : "circular"
              )
            }
            className="bg-blue-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#4a86e8] font-sans text-lg font-bold">
                <i className="fas fa-clipboard-list mr-2"></i>
                過去の回覧板
              </span>
              <i
                className={`fas fa-chevron-${
                  expandedSection === "circular" ? "up" : "down"
                } text-blue-500`}
              ></i>
            </div>
            {expandedSection === "circular" && (
              <div className="mt-4">
                <div className="h-[400px] overflow-y-auto">
                  {tabContent[tab]
                    .filter((item) => item.type === "回覧")
                    .map((item, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border-2 border-blue-300 rounded-lg bg-white"
                      >
                        <h3 className="text-xl font-bold text-blue-600 mb-2">
                          {item.date}
                        </h3>
                        <p className="text-gray-700">{item.content}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </button>
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "minutes" ? null : "minutes"
              )
            }
            className="bg-blue-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#4a86e8] font-sans text-lg font-bold">
                <i className="fas fa-file-alt mr-2"></i>
                過去の議事録
              </span>
              <i
                className={`fas fa-chevron-${
                  expandedSection === "minutes" ? "up" : "down"
                } text-blue-500`}
              ></i>
            </div>
            {expandedSection === "minutes" && (
              <div className="mt-4">
                <div className="h-[400px] overflow-y-auto">
                  {minutes.map((minute, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border-2 border-blue-300 rounded-lg bg-white"
                    >
                      <h3 className="text-xl font-bold text-blue-600 mb-2">
                        {minute.date}
                      </h3>
                      <p className="whitespace-pre-line text-gray-700">
                        {minute.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </button>
          <div className="bg-blue-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                setExpandedSection(expandedSection === "album" ? null : "album")
              }
            >
              <span className="text-[#4a86e8] font-sans text-lg font-bold">
                <i className="fas fa-images mr-2"></i>
                アルバム(鍵付き)
              </span>
              <div className="text-blue-500">
                <i
                  className={`fas fa-chevron-${
                    expandedSection === "album" ? "up" : "down"
                  }`}
                ></i>
              </div>
            </div>
            {expandedSection === "album" && (
              <div className="mt-4">
                {!isAlbumAuthenticated ? (
                  <div className="text-center mb-4">
                    <p className="text-gray-700 mb-4">
                      このコンテンツを閲覧するにはパスワードが必要です
                    </p>
                    <form
                      onSubmit={handlePasswordSubmit}
                      className="space-y-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="password"
                        name="album-password"
                        value={albumPassword}
                        onChange={(e) => setAlbumPassword(e.target.value)}
                        placeholder="パスワードを入力"
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                      {showPasswordError && (
                        <p className="text-red-500 text-sm">
                          パスワードが正しくありません
                        </p>
                      )}
                      <button
                        type="submit"
                        className="block w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        確認
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="h-[400px] overflow-y-auto">
                    {[
                      {
                        date: "2024年3月",
                        title: "春祭りの様子",
                        image: "/images/album/summer-festival.jpg",
                      },
                      {
                        date: "2024年2月",
                        title: "防災訓練の様子",
                        image: "/images/album/disaster-training.jpg",
                      },
                      {
                        date: "2024年1月",
                        title: "清掃活動の様子",
                        image: "/images/album/cleaning-activity.jpg",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border-2 border-blue-300 rounded-lg bg-white"
                      >
                        <h3 className="text-xl font-bold text-blue-600 mb-2">
                          {item.date}
                        </h3>
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <p className="mt-2 text-gray-700">{item.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (tab === "町内会の意義") {
      return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg">
          <h2 className="text-4xl font-bold font-sans mb-8 text-center text-[#4a86e8]">
            地域の力を結集し、安心・安全な街へ
          </h2>
          <div className="mb-8 text-left text-lg text-gray-700">
            <div className="space-y-6">
              <div>
                <p className="font-bold text-blue-600">
                  1. いざという時のために
                </p>
                <p>
                  災害や緊急時、すぐに助け合えるのは地域のつながりです。私たち町内会は、共助の力で地域を守ります。
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-600">
                  2. 日常の困りごとを解決
                </p>
                <p>
                  ゴミの問題や防犯対策、高齢化へのサポートなど、町内会は地域の課題解決に取り組んでいます。住みやすい街を一緒に作りましょう。
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-600">
                  3. 安心して暮らせる地域を
                </p>
                <p>
                  町内会の活動を通じて、誰もが安心して暮らせる安全な地域を目指しています。
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-600">4. 行政との架け橋に</p>
                <p>
                  町内会は、あなたの声を行政に届けます。住民の意見を行政に伝え、より良い地域づくりを進めていきます。
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-600">5. 議会を動かす力も</p>
                <p>
                  必要な時には、私たち町内会が団結し、議会へと働きかけて地域の声を反映させます。
                </p>
              </div>
              <div className="text-center font-bold text-2xl mb-6 text-green-600/80">
                町内会は、あなたと地域をつなぐ「助け合い」の力です。
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <p className="text-lg font-sans">{tabContent[tab]}</p>;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen p-4">
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold font-sans text-center">〇〇町内会</h1>
      </header>

      <nav className="mb-8">
        <ul className="flex flex-wrap justify-center gap-4">
          {Object.keys(tabContent).map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg text-lg font-sans transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#4a86e8] text-white shadow-lg transform scale-105"
                    : "bg-white text-[#4a86e8] hover:bg-[#e1e1e1] hover:shadow-md"
                }`}
              >
                <span className="inline-flex items-center">
                  <i className={`fas fa-${getIconForTab(tab)} mr-2`}></i>
                  {tab}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg">
        {activeTab !== "町内会の意義" && (
          <h2 className="text-3xl font-bold font-sans mb-6 text-center text-blue-800">
            {activeTab}
          </h2>
        )}
        {renderContent(activeTab)}
      </main>

      <footer className="mt-12 text-center text-gray-600 font-sans">
        <p>
          © 2024{" "}
          <a href="/about-us" className="text-blue-600 hover:underline">
            このサイトを運営しているのは私たちです
          </a>
        </p>
      </footer>
    </div>
  );
}

export default MainComponent;