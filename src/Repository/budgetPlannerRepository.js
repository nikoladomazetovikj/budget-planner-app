import { UsersError } from '@/lib/Errors';
import _axios from '@/plugins/axios';
export default {
  async assigneMentalHealth (obj) {
    const response = await _axios.post('/survey/assignsurveytemplatetomultiplepatients', obj.body, { headers: { PatientsIdsList: obj.header } });
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async assignSurveyTemplatetoPatient (obj) {
    try {
      const response = await _axios.post('/survey/assignsurveytemplatetopatient', obj);
      if (response.status === 401 || response.status === 400) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
  async stofferAnswerReorder (obj) {
    const response = await _axios.put('/stofferedanswer/reorder', obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async stquestionReorder (obj) {
    const response = await _axios.put('/stquestion/reorder', obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async assigneMentalHealthEdit (obj) {
    const response = await _axios.put(`/survey/${obj.header}`, obj.body);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async getMentalHealthSurveyTemplates (hospitalId) {
    const headers = { headers: { hospitalId: hospitalId } };
    const response = await _axios.get('/surveytemplate', headers);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async assignSurveyTemplateToClientMonitoringPlan (obj) {
    const response = await _axios.post('/survey/assignsurveytemplatetoclientmonitoringplan', obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async getListOfTemplates () {
    const response = await _axios.get('/surveytemplate/getlistoftemplates');
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async SurveysById (id) {
    const response = await _axios.get(`/surveytemplate/${id}`);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async DeAssignSurveyFromClientMonitoringPlan (body) {
    const response = await _axios.delete('/survey/deassignsurveyfromclientmonitoringplan', { headers: { surveyId: body.surveyId } });
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async deleteSurveyById (id) {
    const response = await _axios.delete(`/survey/${id}`);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async createSurvey (obj) {
    const response = await _axios.post('/surveytemplate', obj);
    if (response.data.resFlag) {
      return response.data.data;
    }
    throw new UsersError('No meta data!');
  },
  async deleteSurveysById (id) {
    try {
      const response = await _axios.delete(`/surveytemplate/${id}`);
      if (response.data.resFlag) {
        return response.data;
      }
      throw new UsersError('No meta data!');
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw error; // rethrow the error to propagate it further if needed
    }
  },
  async updateSurveyTemplate (obj) {
    const response = await _axios.put(`/surveytemplate/${obj.id}`, obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async updateSurvey (obj) {
    const response = await _axios.put(`/survey/${obj.id}`, obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async createQuestion (obj) {
    const response = await _axios.post('/stquestion', obj);
    if (response.data.resFlag) {
      return response.data.data;
    }
    throw new UsersError('No meta data!');
  },
  async updateAnswer (obj) {
    const response = await _axios.put(`/stofferedanswer/${obj.id}`, obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async deleteAnswer (id) {
    const response = await _axios.delete(`/stofferedanswer/${id}`);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async createAnswer (obj) {
    const response = await _axios.post('/stofferedanswer', obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async updateQuestion (obj) {
    const response = await _axios.put(`/stquestion/${obj.id}`, obj);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async deleteQuestion (id) {
    const response = await _axios.delete(`/stquestion/${id}`);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
  async getSurveyForPatient (id) {
    const response = await _axios.get('/survey/getassignedinprogresssurveysforpatient', { headers: { patientId: id } });
    if (response.data.resFlag) {
      return response.data;
    } else {
      throw new UsersError('Could not get data!');
    }
  },
  async getSurveyReportForPatient (obj) {
    const response = await _axios.get('/survey/getsurveysreportforpatient', {
      headers: {
        patientId: obj.patientId,
        filterCase: obj.filterCase,
        limitForOccurrences: obj.limitForOccurrences,
      },
    });
    if (response.data.resFlag) {
      return response.data;
    } else {
      throw new UsersError('Could not get data!');
    }
  },
  async getSurveyRecurrence (obj) {
    const response = await _axios.get('/surveyrecurrence/getchilddata', { headers: { surveyRecurrenceId: obj } });
    if (response.data.resFlag) {
      return response.data;
    } else {
      throw new UsersError('Could not get data!');
    }
  },
  async SurveysAssignedById (id) {
    const response = await _axios.get(`/survey/${id}`);
    if (response.data.resFlag) {
      return response.data;
    }
    throw new UsersError('No meta data!');
  },
};

