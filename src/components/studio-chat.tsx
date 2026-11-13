import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/teamlex-logo.jpg.asset.json';

export function StudioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error } = useChat({ transport: new DefaultChatTransport({ api: '/api/chat' }) });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === 'submitted' || status === 'streaming';
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open, status]);
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [messages, status]);
  function submit(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text }); setInput('');
  }
  return <>
    {open && <section className="chat-panel" aria-label="Chat with Teamlex assistant">
      <header className="chat-head"><img src={logo.url} alt="" /><div><strong>Lex</strong><span>Teamlex Studio assistant</span></div><Button variant="ghost" size="icon" aria-label="Close chat" onClick={() => setOpen(false)}><X /></Button></header>
      <div className="chat-body" aria-live="polite">
        {messages.length === 0 && <p className="chat-msg bot">Hi! I’m Lex. Ask me about our services, how a project works, or how to get started.</p>}
        {messages.map(m => <div key={m.id} className={`chat-msg ${m.role === 'user' ? 'user' : 'bot'}`}>{m.parts.map((p, i) => p.type === 'text' ? <ReactMarkdown key={i}>{p.text}</ReactMarkdown> : null)}</div>)}
        {status === 'submitted' && <p className="chat-msg bot chat-typing">Lex is typing…</p>}
        {error && <p role="alert" className="chat-msg bot text-destructive">The assistant is unavailable right now. Please use the contact form.</p>}
        <div ref={endRef} />
      </div>
      <form className="chat-form" onSubmit={submit}>
        <textarea ref={inputRef} rows={1} value={input} aria-label="Your message" placeholder="Ask about a service…" maxLength={1000} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }} />
        <Button type="submit" size="icon" aria-label="Send message" disabled={busy || !input.trim()}><Send /></Button>
      </form>
    </section>}
    <Button className="chat-launch" size="lg" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <MessageCircle />}<span>{open ? 'Close' : 'Ask Lex'}</span></Button>
  </>;
}
