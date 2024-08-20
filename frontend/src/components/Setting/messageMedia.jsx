import React, { useState ,useEffect} from 'react';
import twemoji from 'twemoji';
import { BiMessageRoundedDetail } from "react-icons/bi";
import '../../../src/Styles/Setting/messageMedia.css';
import { PiShareFatLight } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import ToggleButton from './ToggleButton';



<script src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js" crossorigin="anonymous"></script>

function MessagesMedia() {

    
  const [theme, setTheme] = useState('clean');
  const [nameDisplay, setNameDisplay] = useState('fullname');
  const [additionalOptions, setAdditionalOptions] = useState({
    typing: true,
    clock24: false,
    colorSwatches: true
  });

  useEffect(() => {
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg'
    });
  }, []);

  const [emoji, setEmoji] = useState({
    skinTone: 'default',
    displayAsPlainText: false,
    convertEmoticons: false,
    showReactions: false,
    reactionType: 'frequent'
  });
  const [inlineMedia, setInlineMedia] = useState({
    showUploaded: true,
    showLinked: false,
    showLargeLinked: false,
    showTextPreviews: false
  });


  const handleToggle = (key) => {
    setAdditionalOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };



  const handleEmojiChange = (key, value) => {
    setEmoji(prev => ({ ...prev, [key]: value }));
  };

  const handleInlineMediaChange = (key, value) => {
    setInlineMedia(prev => ({ ...prev, [key]: value }));
  };


 

  return (
    <div className="messages-media-container">
      <div className="section theme">
        <h3>Theme</h3>
        <div className="radio-group-vertical">
          <label>
            <input 
              type="radio" 
              name="theme" 
              value="clean" 
              checked={theme === 'clean'} 
              onChange={() => setTheme('clean')}
            />
            Clean
          </label>
          <label>
            <input 
              type="radio" 
              name="theme" 
              value="compact" 
              checked={theme === 'compact'} 
              onChange={() => setTheme('compact')}
            />
            Compact
          </label>
        </div>
        <hr className="divider" />
        <p>Here is the example</p>


        <div className={`example ${theme}`}>


           {theme === 'clean' && (
            <>
              <img src='./images/apple.png' alt="Alice" className="avatar" />
              <div className="message-content">
                <div className="name-time">
                  <span className="name">Alice</span>
                  <span className="time">9:16 AM</span>
                </div>
                <span className="message">How are you?</span>
              </div>
            </>
          )}
          {theme === 'compact' && (
            <>
              <span className="time">9:16 AM</span>
              <span className="name">Alice</span>
              <span className="message">How are you?</span>
            </>
          )}
        </div>
      </div>
 
      <div className="section names">
        <h3>Names</h3>
        <div className="radio-group-vertical">
          <label>
            <input 
              type="radio" 
              name="nameDisplay" 
              value="fullname" 
              checked={nameDisplay === 'fullname'} 
              onChange={() => setNameDisplay('fullname')}
            />
            Fullname & Display Name
          </label>
          <label>
            <input 
              type="radio" 
              name="nameDisplay" 
              value="displayOnly" 
              checked={nameDisplay === 'displayOnly'} 
              onChange={() => setNameDisplay('displayOnly')}
            />
            Only Display Names
          </label>
        </div>
        <hr className="divider" />
        <p>Here is the example</p>
        <div className="example">
          <img src='./images/apple.png' alt="Alice" className="avatar" />
          <div className="message-content">
            <div className="name-time">
              <span className="name">
                Alice
                <span className={`lastname ${nameDisplay === 'fullname' ? 'show' : 'hide'}`}>
                  Marley
                </span>
                <span className="time">9:16 AM</span>

              </span>
            </div>
            <span className="message">I'm fine.</span>
          </div>
        </div>
      </div>

      <div className="section additional-options">
        <h3>Additional options</h3>
        <hr></hr>
        <ul>
          <li>
            <span>Display information about who is currently typing a message</span>

            <ToggleButton 
              isOn={additionalOptions.typing} 
              onClick={() => handleToggle('typing')} 
            />          </li>
          <li>
            <span>Show times with 24-hour clock</span>
            <ToggleButton 
              isOn={additionalOptions.clock24} 
              onClick={() => handleToggle('clock24')} 
            />
          </li>
          <li>
            <span>Display color swatches next to hexadecimal values</span>
            <ToggleButton 
              isOn={additionalOptions.colorSwatches} 
              onClick={() => handleToggle('colorSwatches')} 
            />
          </li>
        </ul>
        <hr></hr>

      </div>

      <div className="section emoji">
  <h3>Emoji</h3>
  <div className="subsection">
    <h4>Default Skin Tone</h4>
    <p>Choose the default skin tone that will be used whenever you use certain emojis in reactions and messages.</p>
    <div className="emoji-skin-tones">
      {['✋', '✋🏻', '✋🏼', '✋🏽', '✋🏾', '✋🏿'].map((emojiHand, index) => (
        <button
          key={index}
          className={`emoji-skin-tone ${emoji.skinTone === index ? 'selected' : ''}`}
          onClick={() => handleEmojiChange('skinTone', index)}
        >
          {emojiHand}
        </button>
      ))}
    </div>
  </div>
  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        checked={emoji.displayAsPlainText}
        onChange={(e) => handleEmojiChange('displayAsPlainText', e.target.checked)}
      />
      Display emoji as plain text
    </label>
    <label>
      <input
        type="checkbox"
        checked={emoji.convertEmoticons}
        onChange={(e) => handleEmojiChange('convertEmoticons', e.target.checked)}
      />
      Convert my typed emoticons to emoji, so :D becomes 😊
    </label>
    <label>
      <input
        type="checkbox"
        checked={emoji.showReactions}
        onChange={(e) => handleEmojiChange('showReactions', e.target.checked)}
      />
      Show one-click reactions on messages
    </label>
  </div>
  {emoji.showReactions && (
    <div className="radio-group-verticall">
      <label>
        <input
          type="radio"
          checked={emoji.reactionType === 'frequent'}
          onChange={() => handleEmojiChange('reactionType', 'frequent')}
        />
        My most frequently used emoji
      </label>
      <label>
        <input
          type="radio"
          checked={emoji.reactionType === 'custom'}
          onChange={() => handleEmojiChange('reactionType', 'custom')}
        />
        Custom
      </label>
      {emoji.reactionType === 'custom' && (
        <div className="custom-emoji-selection">
          <p>Click below to choose the emoji you'd like.</p>
          <div className="emoji-options">
            {['😍', '😎', '🤔'].map((customEmoji, index) => (
              <button
                key={index}
                className={`emoji-option ${emoji.customEmoji === index ? 'selected' : ''}`}
                onClick={() => handleEmojiChange('customEmoji', index)}
              >
                {customEmoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
  <hr className="divider" />
  <p>Here is the example</p>
  <div className="example emoji-example">
    <div className="message-box">
    <img src='./images/apple.png' alt="Alice" className="avatar" />
    <div className="message-content">
      <div className="name-time">
        <span className="name">Alice</span>
        <span className="time">9:16 AM</span>
      </div>
      <span className="message">Content of message.</span>
    </div>
    </div>
    <div className="emoji-reactions">
      {['✅', '👀', '🙌', '😊', <PiShareFatLight className='icon'/>, <CiBookmark className='icon'/>,<BiMessageRoundedDetail className='icon' />
].map((reactionEmoji, index) => (
        <button key={index} className="reaction">
          {reactionEmoji}
        </button>
      ))}
      <button className="reaction more"><BsThreeDotsVertical className='icon' /></button>
    </div>
  </div>
</div>

<div className="section inline-media">
  <h3>Inline media & links</h3>
  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        checked={inlineMedia.showUploaded}
        onChange={(e) => handleInlineMediaChange('showUploaded', e.target.checked)}
      />
      Show images and files uploaded to Slack
    </label>
    <label>
      <input
        type="checkbox"
        checked={inlineMedia.showLinked}
        onChange={(e) => handleInlineMediaChange('showLinked', e.target.checked)}
      />
      Show image and files from linked websites
    </label>
    {inlineMedia.showLinked && (
      <label className="indented">
        <input
          type="checkbox"
          checked={inlineMedia.showLargeLinked}
          onChange={(e) => handleInlineMediaChange('showLargeLinked', e.target.checked)}
        />
        Even if they're larger than 20MB
      </label>
    )}
    <label>
      <input
        type="checkbox"
        checked={inlineMedia.showTextPreviews}
        onChange={(e) => handleInlineMediaChange('showTextPreviews', e.target.checked)}
      />
      Show text previews of linked websites
    </label>
  </div>
</div>
    </div>
  );
}

export default MessagesMedia;
