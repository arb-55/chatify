import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Base64 inflates ~33%; 7MB file → ~9.3MB (within 10MB backend limit)
    if (file.size > 7 * 1024 * 1024) {
      toast.error("Image is too large. Please select an image under 7MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className="composer">
      {/* Image preview strip */}
      {imagePreview && (
        <div className="image-preview-strip max-w-3xl mx-auto">
          <div className="image-preview-thumb">
            <img src={imagePreview} alt="Preview" />
            <button
              type="button"
              className="image-preview-remove"
              onClick={removeImage}
              aria-label="Remove image"
            >
              <XIcon size={10} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="composer-inner">
        {/* Image attach button */}
        <button
          type="button"
          className={`composer-btn ${imagePreview ? "active" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach image"
          title="Attach image"
        >
          <ImageIcon size={16} />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled) playRandomKeyStrokeSound();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSendMessage(e);
          }}
          className="composer-input"
          placeholder="Type a message…"
          autoComplete="off"
        />

        {/* Send button */}
        <button
          type="submit"
          className="composer-send"
          disabled={!canSend}
          aria-label="Send message"
          title="Send (Enter)"
        >
          <SendIcon size={15} />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;
