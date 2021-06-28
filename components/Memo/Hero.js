function Hero({ title_img_thumb, id, logo_img_thumb, company_id }) {
  return (
    <div className="relative min-w-[120px] max-w-[120px] md:max-w-full">
      <img
        src={title_img_thumb}
        className="w-full h-full object-cover"
        alt={id}
      />
      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 overflow-hidden flex w-6 md:w-10 h-6 md:h-10 rounded-full bg-white shadow-md">
        <img
          src={logo_img_thumb}
          alt={company_id}
          className="object-contain rounded-full"
        />
      </div>
    </div>
  )
}

export default Hero
