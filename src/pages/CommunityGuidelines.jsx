import React from 'react';
import Card from '../components/common/Card';
import './CommunityGuidelines.css';

const CommunityGuidelines = () => {
  return (
    <div className="guidelines-page">
      <div className="guidelines-container">
        {/* Header */}
        <div className="guidelines-header">
          <h1 className="guidelines-title">Community Guidelines</h1>
          <p className="guidelines-subtitle">
            These rules exist to keep the server functional, safe, and enjoyable for everyone. 
            All members are expected to read and follow them, regardless of intent or familiarity.
          </p>
        </div>

        <div className="guidelines-content">
          {/* Punishments Section */}
          <Card className="guidelines-section">
          <h2 className="section-title">Types of Punishments</h2>
          
          <div className="punishment-card">
            <h3 className="punishment-title">⚠️ Warnings</h3>
            <p>
              The staff team may issue warnings to users who violate the rules. Depending on the severity, 
              a warning may result in one or more infractions and may include a temporary timeout. Timeout 
              length is determined by the number of infractions a user has accumulated. Warnings expire after 
              a set period based on severity, and expired warnings do not count toward your infraction total.
            </p>
          </div>

          <div className="punishment-card">
            <h3 className="punishment-title">🔇 Mutes</h3>
            <p>
              If you break a rule or are generally disruptive or a nuisance to others, you may be muted, 
              with or without prior warning.
            </p>
          </div>

          <div className="punishment-card">
            <h3 className="punishment-title">🚫 Bans</h3>
            <p>
              Users who repeatedly receive warnings may eventually be banned. A ban typically occurs after 
              accumulating eight infractions, though severe offenses may result in an immediate ban without 
              prior infractions.
            </p>
          </div>

          <div className="punishment-card">
            <h3 className="punishment-title">🔒 Rolebans</h3>
            <p>
              If deemed necessary, staff may issue a roleban. This restricts you to a private channel where 
              staff can communicate with you directly. Messages in this channel are confidential and retained 
              for moderation records.
            </p>
            <p className="warning-text">
              ⚠️ If you decide to leave the server while you are rolebanned, you will automatically be banned.
            </p>
          </div>
          </Card>

          {/* Logging Section */}
          <Card className="guidelines-section">
            <h2 className="section-title">Logging and Strikes</h2>
            <div className="info-card">
              <p>
                Please be aware that, primarily in order to facilitate moderation of the server, some of our 
                bots record messages and may log them for the staff team to view even after deletion. By 
                participating in the server, you consent to us logging message content for some time if needed.
              </p>
              <p>
                As a side-note, one of our moderation tools employs an automatic strike system that may lead 
                to kicks or bans. This is in place only as a contingency for raids, and unless the infraction 
                was severe, most bans resulting from this will be reversed without consequence or issue. In the 
                same vein, any strikes you have in this system will not be considered during mod decisions.
              </p>
            </div>
          </Card>

          {/* Rules Section */}
          <Card className="guidelines-section">
          <h2 className="section-title">Server Rules</h2>

          <div className="rule-card">
            <div className="rule-number">1</div>
            <div className="rule-content">
              <h3 className="rule-title">Be respectful to others</h3>
              <p>
                Others on this server are humans too. They deserve respect as much as you do. Please do not 
                flame others. <span className="highlight">Doxxing</span> (posting others' personal information 
                without permission) is grounds for an <span className="highlight">immediate ban</span>.
              </p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">2</div>
            <div className="rule-content">
              <h3 className="rule-title">Avoid divisive subjects</h3>
              <p>
                For example, anything politics-related is <span className="highlight">NOT allowed</span> on 
                this server (including images and memes!)
              </p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">3</div>
            <div className="rule-content">
              <h3 className="rule-title">Do not privately message others with unwanted messages/images</h3>
              <p>
                Any harassment or complaints will be subject to disciplinary action.
              </p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">4</div>
            <div className="rule-content">
              <h3 className="rule-title">Do not create alt accounts</h3>
              <p>
                Unless you have a REALLY good reason, they will be removed.
              </p>
              <p className="exception-text">
                <strong>Notable Exception:</strong> If you get locked out of your original account and join 
                with a new one please let us know as soon as you rejoin.
              </p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">5</div>
            <div className="rule-content">
              <h3 className="rule-title">No violent, shocking, or obscene content (NSFW)</h3>
              <p>
                Discussion and imagery of NSFW content are prohibited under all circumstances. This content 
                includes, but is not limited to text, images, or links containing nudity, suggestive/sexual 
                content, excessive violence, gore, pedophilia, or other disturbing content.
              </p>
              <ul className="rule-list">
                <li>If your bio, status, avatar, name, or banner have shocking content, you may be punished.</li>
                <li>No discussion or mention of fetishes, kinks, or any other sexually explicit subject under 
                any circumstances.</li>
              </ul>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">6</div>
            <div className="rule-content">
              <h3 className="rule-title">Please try to communicate in English</h3>
              <p>
                While this is an international community, English is the preferred language of the server.
              </p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">7</div>
            <div className="rule-content">
              <h3 className="rule-title">Be supportive</h3>
              <p>
                Be supportive of new members, do not harass or give misleading information.
              </p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">8</div>
            <div className="rule-content">
              <h3 className="rule-title">No derailing</h3>
              <p>
                Keep chat relevant to the topic of each channel. e.g. Only use bot commands in 🤖┃robotic-conversations.
              </p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">9</div>
            <div className="rule-content">
              <h3 className="rule-title">Listen to the staff team</h3>
              <ul className="rule-list">
                <li>Misuse of the staff ping will result in punishment (if it is clearly done as a joke or spammed).</li>
                <li>Be respectful and listen to the Staff Team's decisions and requests. Do not belittle others 
                for getting support.</li>
                <li>Do not minimod or attempt to find loopholes (rule lawyering).</li>
              </ul>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-number">10</div>
            <div className="rule-content">
              <h3 className="rule-title">Follow Discord's Terms of Service</h3>
              <p>
                Discord Terms of Service: <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">
                  https://discord.com/terms
                </a>
              </p>
            </div>
          </div>
          </Card>
        </div>

        {/* Footer Notice */}
        <div className="guidelines-footer">
          <p>
            Violations may result in warnings or further moderation actions depending on severity and context. 
            Repeated or serious disregard for the rules will lead to escalating consequences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
