import PropTypes from "prop-types";
import Slick from "react-slick";
import { useState } from "react";
import { Global, Overlay, Header, CloseBtn, SlickWrap, ImageWrap, Indicator } from "./styles";


const ImagesZoom = ({ images, onClose }) => {

  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>이미지 상세보기</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrap>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImageWrap key={v.src}>
                <img src={`http://localhost:3030/${v.src}`} alt={v.src} />
              </ImageWrap>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrap>
    </Overlay>
  )
}

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
}

export default ImagesZoom;