"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Heart, Camera, Video, Music, Gift, X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function YuniBirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isCountdownFinished, setIsCountdownFinished] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)

  // Target date: 25 Juni 2025, 19:00 WIB (UTC+7)
  const targetDate = new Date("2025-06-21T14:00:00+07:00")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setIsCountdownFinished(true)
        clearInterval(timer)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const audio = new Audio("/music/songutama.mpeg")
    audio.loop = true
    audio.volume = 0.5
    setAudioRef(audio)

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause()
      } else {
        audioRef.play().catch((error) => {
          console.log("Audio play failed:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Tentukan jumlah foto yang ada
  const totalPhotos = 12

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return

    if (direction === "prev") {
      setSelectedPhoto(selectedPhoto > 1 ? selectedPhoto - 1 : totalPhotos)
    } else {
      setSelectedPhoto(selectedPhoto < totalPhotos ? selectedPhoto + 1 : 1)
    }
  }

  const menuItems = [
    {
      id: "ucapan",
      title: "Pesan Buat Kamu",
      icon: Heart,
      gradient: "from-blue-500 via-sky-500 to-blue-600",
      bgPattern: "bg-gradient-to-br from-blue-50 to-sky-50",
      content: (
        <div className="text-center space-y-6 p-4 md:p-6 lg:p-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <h3 className="relative text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-4">
              Barakallah fii umrik, Yuniii 🎉
            </h3>
          </div>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
            <p className="text-left md:text-center">
              Selamat memasuki angka yang lebih tinggi dari sebelumnya, yun. Berkah umurnya, panjang umur, sehat selalu,
              dimudahkan rezekinya, jadi anak yang selalu berbakti sama orang tua.
            </p>
            <p className="text-left md:text-center">
              Semoga cita-cita yuni segera tercapai, skripsinya lancar, bisa lulus cepat dengan hasil yang memuaskan,
              dan langsung dapat kerja yang yuni impikan.
            </p>
            <p className="text-left md:text-center">
              Aaaa ternyata kita udah di fase umur 21 tahun 🥹🎂. Kenal yuni dari tahun 2019, rasanya waktu cepet banget
              berlalu. Mari berteman sampai tua 👭 sampai anak-anak kita kenal satu sama lain, biar mereka tahu sahabat
              sejati itu beneran ada.
            </p>
            <p className="text-left md:text-center">
              Mari tetap bersama seperti tahun-tahun sebelumnya, mari tetap bersama meskipun sedang berjalan di
              kehidupan masing-masing, mari untuk selalu menyayangi dan mendukung dalam segala hal baik.
            </p>
            <p className="text-left md:text-center">Teruslah tumbuh jadi versi terbaik dari dirimu 🌱</p>
            <p className="text-sm md:text-base lg:text-lg font-semibold text-blue-600 text-left md:text-center">
              I wish I can tell u how much I love you. We're not just a bestfriend, WE'RE SISTER.🫶
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "galeri",
      title: "Slide Memori",
      icon: Camera,
      gradient: "from-cyan-500 via-blue-500 to-cyan-600",
      bgPattern: "bg-gradient-to-br from-cyan-50 to-blue-50",
      content: (
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Galeri Bersama Yuni 📸
            </h3>
            <p className="text-gray-600 text-sm md:text-base">Momen-momen indah yang terabadikan</p>
          </div>

          {/* Photo Grid - Improved Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {Array.from({ length: totalPhotos }, (_, i) => i + 1).map((i) => (
              <div
                key={i}
                className="group aspect-square rounded-lg md:rounded-xl overflow-hidden border-2 border-cyan-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-cyan-100 to-blue-100"
                onClick={() => setSelectedPhoto(i)}
              >
                <img
                  src={`/photo/foto${i}.jpeg`}
                  alt={`Foto ${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement!
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                        <div class="text-center p-2">
                          <svg class="w-6 h-6 md:w-8 md:h-8 text-cyan-500 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span class="text-xs md:text-sm text-cyan-600 font-medium">Foto ${i}</span>
                        </div>
                      </div>
                    `
                  }}
                />
              </div>
            ))}
          </div>

          {/* Modal Foto yang Diperbaiki dengan Navigation */}
          {selectedPhoto && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <div className="relative max-w-2xl w-full max-h-[90vh] flex items-center justify-center">
                {/* Navigation Buttons */}
                <Button
                  onClick={() => navigatePhoto("prev")}
                  className="absolute left-2 md:left-4 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-10 h-10 md:w-12 md:h-12 p-0 backdrop-blur-sm"
                  size="sm"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </Button>

                <Button
                  onClick={() => navigatePhoto("next")}
                  className="absolute right-2 md:right-4 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-10 h-10 md:w-12 md:h-12 p-0 backdrop-blur-sm"
                  size="sm"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </Button>

                {/* Photo Container */}
                <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl max-w-full max-h-full">
                  <div className="relative">
                    <img
                      src={`/photo/foto${selectedPhoto}.jpeg`}
                      alt={`Foto kenangan ${selectedPhoto}`}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  </div>
                  <div className="p-3 md:p-4 text-center bg-white">
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
                      Foto Kenangan {selectedPhoto}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      {selectedPhoto} dari {totalPhotos} foto
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-10 h-10 md:w-12 md:h-12 p-0 backdrop-blur-sm"
                  size="sm"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "video",
      title: "Layar Cerita",
      icon: Video,
      gradient: "from-sky-500 via-blue-500 to-sky-600",
      bgPattern: "bg-gradient-to-br from-sky-50 to-blue-50",
      content: (
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Layar Cerita Kita
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Kumpulan foto yang dirangkai jadi satu video sederhana.
            </p>
          </div>

          {/* Video Player dengan File Asli - Improved Responsive */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="relative aspect-video">
                <video className="w-full h-full object-cover" controls poster="/photo/foto1.jpg" preload="metadata">
                  <source src="/video/video1.mp4" type="video/mp4" />
                  <source src="/video/video1.webm" type="video/webm" />
                  Browser Anda tidak mendukung video HTML5.
                </video>
              </div>

              <div className="p-4 md:p-6 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">Kenangan Dalam Gambar</h4>
                <p className="text-xs md:text-sm text-gray-600">
                  Beberapa foto, satu video, buat nginget momen-momen yang pernah ada.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "musik",
      title: "Sound (Ngga) Biasa",
      icon: Music,
      gradient: "from-blue-500 via-indigo-500 to-blue-600",
      bgPattern: "bg-gradient-to-br from-blue-50 to-indigo-50",
      content: (
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Cuplikan Sound Spesial Buat Yuni 🔊
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Bukan full music, tapi potongan suara yang penuh makna💖
            </p>
          </div>

          {/* Playlist dengan Audio Player - Improved Layout */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { title: "Sahabat Tak Akan Pergi", artist: "Betrand Putra Onsu, Anneth Deliecia", file: "song1.mp4" },
              { title: "Teman Sejati", artist: "Hivi", file: "song2.mp4" },
              { title: "Satu Frekuensi", artist: "Suara Kayu", file: "song3.mp4" },
              { title: "Tujuh Belas", artist: "Tulus", file: "song4.mpeg" },
            ].map((song, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Music className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base truncate">{song.title}</h4>
                      <p className="text-xs md:text-sm text-gray-500 truncate">{song.artist}</p>
                    </div>
                  </div>

                  {/* Audio Player - Improved Styling */}
                  <div className="w-full">
                    <audio
                      controls
                      className="w-full h-8 md:h-10"
                      style={{
                        filter: "sepia(20%) saturate(70%) hue-rotate(180deg)",
                        borderRadius: "8px",
                      }}
                      preload="metadata"
                    >
                      <source src={`/music/${song.file}`} type="audio/mpeg" />
                      <source src={`/music/${song.file.replace(".mpeg", ".ogg")}`} type="audio/ogg" />
                      Browser Anda tidak mendukung audio HTML5.
                    </audio>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  if (!isCountdownFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-sky-900 to-cyan-900 relative overflow-hidden flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}

          {/* Gradient orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 md:w-72 md:h-72 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-sky-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center space-y-6 md:space-y-8 max-w-4xl mx-auto p-4">
          {/* Header */}
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 border border-white/20">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 animate-spin" />
              <span className="text-white/90 font-medium text-sm md:text-base">This Page Is for You💌</span>
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 animate-spin" />
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-100 drop-shadow-2xl">
              SPECIAL FOR YUNIIII
            </h1>

            <div className="text-4xl md:text-6xl animate-bounce">🎂</div>
          </div>

          {/* Countdown */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: "DAYS", value: timeLeft.days, color: "from-blue-400 to-cyan-400" },
                { label: "HOURS", value: timeLeft.hours, color: "from-sky-400 to-blue-400" },
                { label: "MINUTES", value: timeLeft.minutes, color: "from-cyan-400 to-sky-400" },
                { label: "SECONDS", value: timeLeft.seconds, color: "from-blue-400 to-indigo-400" },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`bg-gradient-to-br ${item.color} rounded-xl md:rounded-2xl p-3 md:p-4 mb-2 shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-white/30`}
                  >
                    <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-lg">
                      {item.value.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-white/80 font-bold text-xs md:text-sm tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Date */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
            <p className="text-white/70 text-sm md:text-lg font-medium">
              🗓️ Menuju <span className="text-white font-bold">25 Juni 2025, 14:00 WIB</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 relative">
      {/* Header - Improved Responsive */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
            <Gift className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-blue-500 flex-shrink-0" />
            <span className="truncate">Happy Birthday Yuni!</span>
          </h1>
          <Button
            onClick={toggleMusic}
            className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white shadow-lg px-3 py-2 md:px-4 lg:px-6 text-sm md:text-base flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="ml-2 hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
            <span className="ml-2 hidden md:inline">Music</span>
          </Button>
        </div>
      </div>

      {/* Hidden audio element for background music */}
      <audio
        ref={(audio) => {
          if (audio && !audioRef) {
            audio.loop = true
            audio.volume = 0.5
            setAudioRef(audio)
          }
        }}
        preload="auto"
      >
        <source src="/music/songutama.mpeg" type="audio/mpeg" />
        <source src="/music/songutama.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 lg:py-12">
        {/* Welcome Section - Improved Responsive */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-4 md:space-y-6 lg:space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative text-3xl md:text-5xl lg:text-6xl xl:text-8xl mb-4 md:mb-6">🎉</div>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
            SURPRISE!
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Welcome to a page full of little memories.✨
            <br />
            Isinya mungkin sederhana, tapi semua punya cerita hehe
          </p>
        </div>

        {/* Menu Cards - Improved Grid Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 xl:gap-8 max-w-6xl mx-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Card
                key={item.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm h-28 sm:h-32 md:h-36 lg:h-40 xl:h-48"
                onClick={() => setActiveModal(item.id)}
              >
                <CardContent className="p-0 h-full">
                  <div
                    className={`bg-gradient-to-br ${item.gradient} p-3 md:p-4 lg:p-6 xl:p-8 text-white relative overflow-hidden h-full flex flex-col justify-center`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-white/10 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-6 h-6 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full transform group-hover:scale-125 transition-transform duration-500"></div>

                    <div className="relative z-10 text-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-white/20 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4 group-hover:rotate-12 transition-transform duration-300">
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 transform group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold mb-1 md:mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <div className="w-4 h-0.5 md:w-6 md:h-0.5 lg:w-8 lg:h-1 bg-white/50 rounded-full mx-auto group-hover:w-6 md:group-hover:w-8 lg:group-hover:w-12 transition-all duration-300"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Modal - Improved Responsive */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl max-w-5xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-3 md:p-4 lg:p-6 flex justify-between items-center rounded-t-xl md:rounded-t-2xl lg:rounded-t-3xl">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 truncate pr-4">
                {menuItems.find((item) => item.id === activeModal)?.title}
              </h2>
              <Button
                onClick={() => setActiveModal(null)}
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 rounded-full w-8 h-8 md:w-10 md:h-10 p-0 flex-shrink-0"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
            <div
              className={`${menuItems.find((item) => item.id === activeModal)?.bgPattern} overflow-y-auto max-h-[calc(95vh-60px)] md:max-h-[calc(90vh-80px)]`}
            >
              {menuItems.find((item) => item.id === activeModal)?.content}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-6 md:py-8 text-gray-500">
        <p className="flex items-center justify-center gap-2 text-sm md:text-base">Dari ❤️ buat Yuni</p>
      </div>
    </div>
  )
}
