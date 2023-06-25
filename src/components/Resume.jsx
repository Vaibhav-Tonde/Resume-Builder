import React, { useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import TagAutocomplete from "react-tag-autocomplete"; // Assuming you've installed a suitable library for tag input
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    backgroundColor: "#5bc0de",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  skillTags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillTag: {
    backgroundColor: "#eeeeee",
    color: "#333333",
    fontSize: 12,
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
});

const ResumeBuilder = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState([
    { institute: "", year: "", degree: "" },
  ]);
  const [experience, setExperience] = useState([
    { company: "", year: "", designation: "" },
  ]);
  const [skills, setSkills] = useState([]);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const handleAddMoreEducation = () => {
    setEducation([...education, { institute: "", year: "", degree: "" }]);
  };

  const handleAddMoreExperience = () => {
    setExperience([...experience, { company: "", year: "", designation: "" }]);
  };

  const handleSkillsChange = (tags) => {
    if (tags.length > skills.length) {
      const newSkill = tags.find((tag) => !skills.includes(tag));

      console.log("New skill added:", newSkill);
    }

    setSkills(tags);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic with the collected resume data
    console.log({
      name,
      email,
      address,
      phone,
      education,
      experience,
      skills,
    });
    // Reset form fields
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
    setEducation([{ institute: "", year: "", degree: "" }]);
    setExperience([{ company: "", year: "", designation: "" }]);
    setSkills([]);
  };

  const generatePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Name:</Text>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Email:</Text>
          <Text style={styles.text}>{email}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Address:</Text>
          <Text style={styles.text}>{address}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Phone:</Text>
          <Text style={styles.text}>{phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education:</Text>
          {education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.text}>{`Institute: ${edu.institute}`}</Text>
              <Text style={styles.text}>{`Year: ${edu.year}`}</Text>
              <Text style={styles.text}>{`Degree: ${edu.degree}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Experience:</Text>
          {experience.map((exp, index) => (
            <View key={index}>
              <Text style={styles.text}>{`Company: ${exp.company}`}</Text>
              <Text style={styles.text}>{`Year: ${exp.year}`}</Text>
              <Text
                style={styles.text}
              >{`Designation: ${exp.designation}`}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills:</Text>
          <View>
            {skills.map((skill, index) => (
              <Text key={index}>{skill.name}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="container">
      <h2 className="title">Resume Builder</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="mb-5">
            <div className="form-group">
              <label htmlFor={`institute${index}`}>Institute:</label>
              <input
                type="text"
                id={`institute${index}`}
                className="form-control"
                value={edu.institute}
                onChange={(e) =>
                  handleEducationChange(index, "institute", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`year${index}`}>Year:</label>
              <input
                type="text"
                id={`year${index}`}
                className="form-control"
                value={edu.year}
                onChange={(e) =>
                  handleEducationChange(index, "year", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`degree${index}`}>Degree:</label>
              <input
                type="text"
                id={`degree${index}`}
                className="form-control"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-info"
          onClick={handleAddMoreEducation}
        >
          Add More Education
        </button>

        <h3>Experience</h3>
        {experience.map((exp, index) => (
          <div key={index} className="mb-5">
            <div className="form-group">
              <label htmlFor={`company${index}`}>Company:</label>
              <input
                type="text"
                id={`company${index}`}
                className="form-control"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`year${index}`}>Year:</label>
              <input
                type="text"
                id={`year${index}`}
                className="form-control"
                value={exp.year}
                onChange={(e) =>
                  handleExperienceChange(index, "year", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`designation${index}`}>Designation:</label>
              <input
                type="text"
                id={`designation${index}`}
                className="form-control"
                value={exp.designation}
                onChange={(e) =>
                  handleExperienceChange(index, "designation", e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-info"
          onClick={handleAddMoreExperience}
        >
          Add More Experience
        </button>

        <div className="form-group">
          <h3 htmlFor="skills">Skills:</h3>

          <TagAutocomplete
            value={skills}
            onChange={handleSkillsChange}
            suggestions={[
              { id: 1, name: "PHP" },
              { id: 2, name: "JavaScript" },
              { id: 3, name: "Python" },
              { id: 4, name: "HTML" },
              { id: 5, name: "Java" },
              { id: 6, name: "Sql" },
              { id: 7, name: "Css" },
            ]}
            onAddition={(skill) => setSkills([...skills, skill])}
            onDelete={(index) =>
              setSkills(skills.filter((_, i) => i !== index))
            }
          />
          <ul>
            {skills.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        </div>

        {/* Generate PDF download link */}
        <PDFDownloadLink
          document={generatePDF()}
          fileName="resume.pdf"
          className="btn btn-success"
          style={{ marginBottom: 50 }}
        >
          Download PDF
        </PDFDownloadLink>
      </form>
    </div>
  );
};

export default ResumeBuilder;
